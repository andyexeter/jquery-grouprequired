#!/usr/bin/env bash

# This script bumps version numbers in the following files:
#	package.json - Bumps the version field.
#
# Usage: ./bin/bump-version.sh <major|minor|patch> - Increments the relevant version part by one.
#
# Usage 2: ./bin/bump-version.sh <version-from> <version-to>
# 	e.g: ./bin/bump-version.sh 1.1.1 2.0

if [ "$1" == "" ]; then
	echo "No 'from' version set. Exiting"
	exit 1
fi

if [ "$1" == "major" ] || [ "$1" == "minor" ] || [ "$1" == "patch" ]; then
	current_version=$(grep -Po '(?<="version": ")[^"]*' package.json)

	IFS='.' read -a version_parts <<< "$current_version"

	major=${version_parts[0]}
	minor=${version_parts[1]}
	patch=${version_parts[2]}

	case "$1" in
		"major")
			major=$((major + 1))
			;;
		"minor")
			minor=$((minor + 1))
			;;
		"patch")
			patch=$((patch + 1))
			;;
	esac
	new_version="$major.$minor.$patch"
else
	if [ "$2" == "" ]; then
		echo "No 'to' version set. Exiting"
		exit 1
	fi
	current_version="$1"
	new_version="$2"
fi

if ! [[ "$new_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
	echo "'to' version doesn't look like a valid semver version tag (e.g: 1.2.3). Exiting"
	exit 1
fi

read -r -p "Bump version number from $current_version to $new_version? [Y/n]: " confirm

case "$confirm" in
	[Nn][Oo]|[Nn])
		echo "Exiting"
		exit
		;;
esac

function bump() {
	echo -n "Updating $1..."
	sed -i "s/$2/$3/1w bumpchangelog.tmp" $1
	if [ -s bumpchangelog.tmp ]; then
		echo "Done"
	else
		echo "Nothing to change"
	fi
	rm -f bumpchangelog.tmp
}

bump package.json "\"version\": \"$current_version\"" "\"version\": \"$new_version\""

grunt

read -r -p "Publish v$new_version? [Y/n]: " confirm

case "$confirm" in
	[Nn][Oo]|[Nn])
		echo "Exiting"
		exit
		;;
esac

git add --all
git commit -m "Bumped version to $new_version"
git tag v"$new_version"

git push origin master
git push --tags

npm publish

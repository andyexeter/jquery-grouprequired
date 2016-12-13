module.exports = {
	options: {
		jshintrc: '.jshintrc'
	},
	dist: {
		src: '<%= files.main %>'
	},
	grunt: {
		options: {
			node: true
		},
		src: 'Gruntfile.js'
	}
};

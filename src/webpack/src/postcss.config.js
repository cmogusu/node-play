module.exports = ({ file, options, env }) => ({
  plugins: {
  	'precss': {},
    'postcss-preset-env': options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
  }
})
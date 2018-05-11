module.exports = {
  presets: [
    '@babel/preset-flow',
    '@babel/preset-react',
    ['@babel/preset-env', {
      targets: { browser: ['> 1%'] },
      DEBUG: true,
    }],
  ],

  plugins: ['@babel/plugin-proposal-object-rest-spread'],

  ignore: [
    'src/*.spec.js'
  ],
};

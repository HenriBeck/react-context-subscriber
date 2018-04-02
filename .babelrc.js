module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      targets: { browser: ['> 1%'] },
      DEBUG: true,
    }],
    '@babel/preset-flow',
  ],

  plugins: ['@babel/plugin-proposal-object-rest-spread'],

  ignore: [
    'src/*.spec.js'
  ],
};

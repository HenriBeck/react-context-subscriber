module.exports = {
  presets: [
    '@babel/preset-flow',
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { browsers: ['> 1%'] } }],
  ],

  plugins: ['@babel/plugin-proposal-object-rest-spread'],
};

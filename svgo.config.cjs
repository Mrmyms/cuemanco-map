module.exports = {
  multipass: true,
  precision: 1,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupNumericValues: { floatPrecision: 1 },
          convertPathData: { floatPrecision: 1, transformPrecision: 1 }
        }
      }
    },
    'removeDimensions',
    'removeUselessDefs',
    'cleanupIds'
  ]
};

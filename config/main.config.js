
module.exports = (() => {
  const {
    PORT,
    NODE_ENV,
  } = process.env;

  return {
    PORT,
    NODE_ENV,
  };
})();
const { promises } = require('fs');

async function checkPath(path) {
  return promises
    .access(path)
    .then(() => true)
    .catch(() => false);
}

module.exports = {
  checkPath,
};

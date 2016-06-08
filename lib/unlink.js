const fs = require('fs');
const path = require('path');

const unlink = (directories, cwd = process.cwd()) => {
  Object.keys(directories).forEach((name) => {
    const dist = path.join(cwd, 'node_modules', name);

    fs.exists(dist, (exists) => {
      if (!exists) { return; }
      fs.unlinkSync(dist);
    });
  });
};

module.exports = unlink;

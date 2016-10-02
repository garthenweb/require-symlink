const fs = require('fs');
const path = require('path');

const unlink = (directories, cwd = process.cwd()) => {
  Object.keys(directories).forEach((name) => {
    const dist = path.join(cwd, 'node_modules', name);

    fs.lstat(dist, (err, stat) => {
      if (!err && stat.isSymbolicLink()) {
        fs.unlinkSync(dist);
      }
    });
  });
};

module.exports = unlink;

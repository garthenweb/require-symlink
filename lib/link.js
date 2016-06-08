const fs = require('fs');
const path = require('path');

const link = (directories, cwd = process.cwd()) => {
  Object.keys(directories).forEach((name) => {
    const dist = path.join(cwd, 'node_modules', name);
    const src = path.join(cwd, directories[name]);

    fs.exists(dist, (exists) => {
      if (exists) { return; }
      fs.symlinkSync(src, dist, 'dir');
    });
  });
};

module.exports = link;

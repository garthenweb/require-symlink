const fs = require('fs');
const path = require('path');

const link = (directories, cwd = process.cwd()) => {
  Object.keys(directories).forEach((name) => {
    const cwdDist = path.join(cwd, 'node_modules');
    const dist = path.join(cwdDist, name);
    const cwdSrc = path.join(cwd, directories[name]);
    const src = path.relative(cwdDist, cwdSrc);

    fs.exists(dist, (exists) => {
      if (exists) { return; }
      fs.symlinkSync(src, dist, 'dir');
    });
  });
};

module.exports = link;

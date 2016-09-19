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

      fs.stat(cwdSrc, (err, stats) => {
        if (err) {
          if (err.code === 'ENOENT') {
            throw new Error(`No entry: ${cwdSrc}`);
          }
          throw err;
        }

        if (stats.isFile()) {
          fs.symlinkSync(src, dist, 'file');
        }

        if (stats.isDirectory()) {
          fs.symlinkSync(src, dist, 'dir');
        }

      });

    });
  });
};

module.exports = link;

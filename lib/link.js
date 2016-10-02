const fs = require('fs');
const path = require('path');

function getTypeByStats(stats) {
  if (stats.isFile()) {
    return 'file';
  }

  if (stats.isDirectory()) {
    return 'dir';
  }

  throw new Error('Unknown entry type');
}

const link = (directories, cwd = process.cwd()) => {
  Object.keys(directories).forEach((name) => {
    const cwdDist = path.join(cwd, 'node_modules');
    const dist = path.join(cwdDist, name);
    const cwdSrc = path.join(cwd, directories[name]);
    const src = path.relative(cwdDist, cwdSrc);

    fs.stat(dist, (distErr, distStat) => {
      if (distErr) {
        throw distErr;
      }

      if (distStat.isSymbolicLink()) {
        return;
      }

      fs.stat(cwdSrc, (cwdErr, cwdStats) => {
        if (cwdErr) {
          if (cwdErr.code === 'ENOENT') {
            throw new Error(`No entry: ${cwdSrc}`);
          }
          throw cwdErr;
        }

        const type = getTypeByStats(cwdStats);
        fs.symlinkSync(src, dist, type);
      });
    });
  });
};

module.exports = link;

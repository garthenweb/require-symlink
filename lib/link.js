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
    const relSrc = path.relative(cwdDist, cwdSrc);

    fs.lstat(dist, (distErr, distStat) => {
      // only show errors if it does not say that the file does not exists
      if (distErr && distErr.code !== 'ENOENT') {
        throw distErr;
      }

      // the symlink was already created, we can stop here
      if (distStat && distStat.isSymbolicLink()) {
        return;
      }

      // now check it the source exists and get the type of the file to generate
      // the new symlink
      fs.stat(cwdSrc, (srcErr, srcStats) => {
        if (srcErr) {
          throw srcErr;
        }

        const type = getTypeByStats(srcStats);
        fs.symlinkSync(relSrc, dist, type);
      });
    });
  });
};

module.exports = link;

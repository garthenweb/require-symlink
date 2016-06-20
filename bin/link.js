#!/usr/bin/env node
const path = require('path');
const link = require('../lib/link');
const unlink = require('../lib/unlink');

const pkgPath = path.join(process.cwd(), 'package.json');
const directories = require(pkgPath).requireSymlinks;

if (process.argv[2] === 'unlink') {
  unlink(directories);
} else {
  link(directories);
}

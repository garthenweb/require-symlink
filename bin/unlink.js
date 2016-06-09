#!/usr/bin/env node
const path = require('path');
const unlink = require('../lib/unlink');

const pkgPath = path.join(process.cwd(), 'package.json');
const directories = require(pkgPath).requireSymlinks;
unlink(directories);

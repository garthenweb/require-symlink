#!/usr/bin/env node
const path = require('path');
const link = require('../lib/link');

const pkgPath = path.join(process.cwd(), 'package.json');
const directories = require(pkgPath).requireSymlinks;
link(directories);

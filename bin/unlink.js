#!/usr/bin/env node
const path = require('path');
const directories = require(path.join(process.cwd(), 'package.json'))['require-symlinks'];
const unlink = require('../lib/unlink');
unlink(directories);

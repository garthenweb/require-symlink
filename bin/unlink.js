#!/usr/bin/env node
const directories = require('../package.json')['require-symlinks'];
const unlink = require('../lib/unlink');
unlink(directories);

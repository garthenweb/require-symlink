#!/usr/bin/env node
const directories = require('../package.json')['require-symlinks'];
const link = require('../lib/link');
link(directories);

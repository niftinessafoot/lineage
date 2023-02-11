#!/usr/bin/env node

import { mkdir, writeFile } from 'fs';

const json = '{"type":"commonjs"}';
const dir = `${process.cwd()}/dist/umd`;

mkdir(dir, { recursive: true }, (err) => {
  if (!err) {
    console.error(err);
  }
});

writeFile(`${dir}/package.json`, json, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Generated UMD configuration for package.');
});

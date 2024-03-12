#!/usr/bin/env node
import path from 'path';
import fse from 'fs-extra'
import { program } from 'commander';
import { fileURLToPath } from 'url';
// const program = require("commander");

import { helpOptions } from '../lib/help.js';
import { createOption } from '../lib/create.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pageInfo = await fse.readJSON(path.join(__dirname, '../package.json'));
// 查看版本号
program.version(pageInfo.version, '-v, -V, -version, -Version');
// program.version(`jhj-cli ${require("../package.json").version}`);
// program
//   .name("jhj")
//   .usage(`<command> [option]`)
//   .version('1.0.0', '-v');

// 帮助信息
helpOptions()
// 创建
createOption()

// 出口
program.parse(process.argv);

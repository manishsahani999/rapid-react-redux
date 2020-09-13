/**
 * Copyright (c) 2020-present, Manish Sahani.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @author Manish Sahani <rec.manish.sahani@gmail.com>
 * @since Sept, 2020
 */

'use strict';

const commander = require('commander');
const chalk = require('chalk');
const execSync = require('child_process').execSync;

const packageJson = require('./package.json');
const BASE_REPO_URL = 'https://github.com/manishsahani999/react-starter.git';

let projectName;

const app = () => {
    const program = new commander.Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<project-directory>')
        .usage(`${chalk.green('<project-directory>')} [options]`)
        .action(name => {
            projectName = name;
        })
        .parse(process.argv)

    try {
        console.log(chalk.cyan(`Creating a new project - ${projectName}`));
        execSync(`git clone ${BASE_REPO_URL} ${projectName}`, {stdio: 'inherit'});
        execSync(`cd ${projectName} && npm i`, {stdio: 'inherit'});
        execSync(`cd ${projectName} && npm audit fix`, {stdio: 'inherit'});
        execSync(`cd ${projectName} && npm start`, {stdio: 'inherit'});
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {
    app,
}
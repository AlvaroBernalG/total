#!/usr/bin/env node

require('module-alias/register');
import * as path from 'path';
const pck = require(path.join(__dirname, '../package.json'));
import Command from 'lib/command';
import load from 'lib/loader';
import * as program from 'commander';
const getStdin = require('get-stdin');

(async () => {

	const [stdin, commands] = await Promise.all([
		getStdin(),
		load('./commands').then(config)
	]);

	let output: string[];

	try {

		output = await Promise.all<string>(
			commands
				.filter((command: Command): Command => program[command.name.toLowerCase()])
				.map((command: Command): Promise<string> => command.onRun(stdin, program))
		);

	} catch (error) {
		console.log('Error while processing the commands.', error);
		process.exit(1);
	}

	output.forEach((out: string): void => out && console.log(out));

})();

function config(commands: any[]): Command[] {

	commands = commands.map((Command: any): Command => {
		const command: Command = new Command();
		command.register(program);
		return command;
	});

	program
		.version(pck.version)
		.parse(process.argv);

	return commands;
}

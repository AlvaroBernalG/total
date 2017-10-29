#!/usr/bin/env node

require('module-alias/register');
const getStdin = require('get-stdin');
import * as path from 'path';
const pck = require(path.join(__dirname, '../package.json'));
import { Command, CommandConfig, loadCommands, CommandArgs } from 'lib/command';
import * as program from 'commander';

(async () => {
	const [stdin, commands] = await Promise.all([getStdin(), loadCommands()]);

	commands.forEach((Command: any) => {
		const cmd: Command = new Command();

		const config: CommandConfig = cmd.register();

		registerCommand(cmd, config, stdin);
	});

	program.version(pck.version).parse(process.argv);
})();

function registerCommand(
	command: Command,
	config: CommandConfig,
	stdin: string
) {
	const programState = program
		.command(config.name)
		.description(config.description);

	for (const option of config.options) {
		programState.option(option.flags, option.description);
	}

	programState.action((commander: any) => {
		const argsPassed: CommandArgs[] = config.options
			.filter((op: CommandArgs) => commander[op.name])
			.map((op: CommandArgs) => ({
				...op,
				['value']: commander[op.name],
			}));

		command
			.onRun(stdin, argsPassed)
			.catch(err => console.log(err.message))
			.then(console.log);
	});
}

#!/usr/bin/env node
require('module-alias/register')
import * as path from 'path'
const pck = require(path.join(__dirname, '../package.json'))
import Command from "lib/command";
import load from "lib/loader";
import * as program from "commander";
const getStdin = require('get-stdin');

(async () => {

	const [stdin, commands] = await Promise.all([
		getStdin(),
		load('./commands').then(config)
	])

	let output

	try {

		output = await Promise.all<Command[]>(
			commands
				.filter((command: any) => program[command.name.toLowerCase()])
				.map((command: any) => command.onRun(stdin, program))
		)

	}catch (error) {
		console.log('Error while processing commands.', error);
		process.exit(1)
	}
	
	output.forEach((out: any): void => out && console.log(out))

})()

function config(commands: any[]): Command[] {
	
	commands = commands.map((Command: any)=> {
		const command : Command = new Command()
		command.setUp(program)
		return command
	})
	
	program
		.version(pck.version)
		.parse(process.argv)

	return commands
}

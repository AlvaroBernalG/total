const { loadAll, dir} = require('./file');
import Command from "lib/command";
import * as program from "commander";

export default async function load(commands_folder_path: string): Promise<Command[]> {

	const commandPaths = await dir(commands_folder_path)
	
	let commands = await loadAll(
		commandPaths.map((name: any) => `${commands_folder_path}/${name}`)
	)

	return commands
}


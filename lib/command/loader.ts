import * as fs from 'fs';
import { load, dir } from 'lib/file';
import { Command } from './command';

const COMMANDS_PATH = './commands';

export async function loadCommands(
	dirPath = COMMANDS_PATH
): Promise<fs.Stats[]> {
	const commandPaths: string[] = await dir(dirPath);

	const commands = await load(
		commandPaths.map((fileName: string): string => `${dirPath}/${fileName}`)
	);

	return commands;
}

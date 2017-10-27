import { load, dir } from './file';
import Command from 'lib/command';

export default async function loader(dirPath: string): Promise<Command[]> {

	const commandPaths: string[] = await dir(dirPath);

	const commands = await load(
		commandPaths.map((fileName: string): string => `${dirPath}/${fileName}`)
	);

	return commands;
}


const folderSize = require('get-folder-size');
import { FileNotFound, PathNotFound } from 'lib/error';
import { stats } from 'lib/file';
import {
	Command,
	CommandArgs,
	CommandConfig,
	hasArgs,
	getArg,
} from 'lib/command';

export const enum Unit {
	Byte = 'b',
	Kilobyte = 'kb',
	Megabyte = 'mb',
	Gigabyte = 'gb',
}

const getFolderSize = (path: string, ignoreRegx?: any): Promise<number> =>
	new Promise((resolve: any, reject: any) => {
		folderSize(path, ignoreRegx, (err: any, size: number) => {
			if (err) return reject(size);

			resolve(size);
		});
	});

const bytes = (bytes: number) => (target: Unit) => {
	switch (target) {
		case Unit.Byte:
			return bytes;
		case Unit.Kilobyte:
			return bytes / 1000;
		case Unit.Megabyte:
			return bytes / 1000 / 1000;
		case Unit.Gigabyte:
			return bytes / 1000 / 1000 / 1000;
		default:
			return bytes;
	}
};

async function getPathSize(path: string, ignore?: string): Promise<number> {
	const ignoreRegex = ignore ? new RegExp(ignore) : ignore;

	let dirSize: number = 0;

	try {
		dirSize = await getFolderSize(path, ignoreRegex);
	} catch (error) {
		throw new PathNotFound(path);
	}

	return dirSize;
}

async function getSize(stdin: string): Promise<number> {
	let stat: string[];

	try {
		stat = await stats(stdin.split('\n').filter((path: string) => path));
	} catch (error) {
		throw new FileNotFound(stdin.replace('\n', ' '));
	}

	const totalSize: number = stat.reduce(
		(prev: number, next: any) => next.size + prev,
		0
	);

	return totalSize;
}

export default class Size implements Command {
	register(): CommandConfig {
		const config: CommandConfig = {
			name: 'size',
			description:
				'File size. From a list of file paths (separated by a line break), get the total size (defaults to bytes)',
			options: [
				{
					name: 'path',
					flags: '-p, --path [path]',
					description: 'directory/file path.',
				},
				{
					name: 'ignore',
					flags: '-i, --ignore [ignore]',
					description: 'directory to ignore.',
				},
				{ name: 'unit', flags: '-u, --unit [unit]', description: 'Unit size.' },
			],
		};

		return config;
	}

	async onRun(stdin: string, args: CommandArgs[]): Promise<string> {
		let totalSize = await getSize(stdin);

		if (hasArgs('path', args)) {
			const path: CommandArgs = getArg('path', args);
			const ignore: CommandArgs = getArg('ignore', args);
			const dirSize = await getPathSize(path.value, ignore.value);
			totalSize = totalSize + dirSize;
		}

		const unit: CommandArgs = getArg('unit', args);

		totalSize = unit ? bytes(totalSize)(unit.value) : totalSize;

		return String(totalSize);
	}
}

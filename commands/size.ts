import Command from "lib/command";
import * as Commander from "commander";
import { readAll, statsAll } from "lib/file";

const bytes = (bytes: number) => (target: string) => {
  switch (target.toLowerCase()){
    case 'b': return bytes;
    case 'kb': return bytes / 1000;
    case 'mb': return bytes / 1000 / 1000;
		case 'gb': return bytes / 1000 / 1000 / 1000; 
		default: return bytes
  }
}

export default class Size implements Command {

	args = '-s --size [unit]'
	name = 'size'
  description = 'From a list of file paths (separated by a line break), get the total size (defaults to bytes)'

	setUp(commander: Commander.CommanderStatic): void {
		commander.option(this.args, this.description)
	}

	async onRun(stdin: string, commander: Commander.CommanderStatic): Promise<string> {

		const { args, size } = commander

		const pretty = args.indexOf('pretty') >= 0 || args.indexOf('p') >= 0
		
		let stats 

		try {
			stats = await statsAll(
				stdin
				.split('\n')
				.filter((f: string) => f)
			)
		} catch (error) {
			console.log('Unable to open file: ', stdin);
			process.exit(1)
		}

		let result = stats.reduce((prev: number, next: any) => next.size + prev, 0)

		result = size !== true ? bytes(result)(size) : result

		result = Number(result)

		return pretty ? `Size --> ${result} ${size === true ? 'bytes': size}`: result
	}
} 
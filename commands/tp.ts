import Command from 'lib/command';
import * as Commander from 'commander';

export class TextProcessor {

	chars(content: string): number {
		return content.split('').length;
	}

	words(content: string): number {
		return content.match(/\w+/g).length;
	}

	numberLines(content: string): number {
		return content.split('\n').length;
	}

	longestLine(content: string): number {

		const lines: string[] = content.split('\n');

		const longest: number = lines.reduce((best: number, line: string): number => {
			return (line.length > best) ? line.length : best;
		}, 0);

		return longest;
	}

}

export default class Tp extends TextProcessor implements Command {

	name = 'tp';
	description = 'Text Processor';
	args = '--tp [subcommand]';
	stdin = '';

	register(commander: Commander.CommanderStatic): void {
		commander.option(this.args, this.description);
	}

	async onRun(stdin: string, commander: Commander.CommanderStatic): Promise<string> {

		const subcommand: string = commander['tp'];

		switch (subcommand) {

			case 'l': return String(this.numberLines(stdin));

			case 'L': return String(this.longestLine(stdin));

			case 'w': return String(this.words(stdin));

			case 'c': default: return String(this.chars(stdin));
		}
	}
}

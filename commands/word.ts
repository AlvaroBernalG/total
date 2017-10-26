import Command from 'lib/command'
import * as Commander from 'commander'

export default class Word implements Command {

	stdin = '';
	name = 'word';
	args = '-w --word';
	description = 'Returns the total words.';

	register(commander: Commander.CommanderStatic): void {
		commander.option(this.args, this.description);
	}

	async onRun(stdin: string, commander: Commander.CommanderStatic) : Promise<string> {
		return stdin ?  String(stdin.match(/[A-z0-9]+/g).length): '0';
	}

}

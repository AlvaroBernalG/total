import * as Commander from 'commander';

export default interface Command {
	description: string;
	args: string;
	name: string;
	onRun: (stdin: string, commander: Commander.CommanderStatic) => Promise<string>;
	register: (commander: Commander.CommanderStatic) => void;
}

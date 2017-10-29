import * as Commander from 'commander';
import { CommandArgs } from './args';
import { CommandConfig } from './config';

export interface Command {
	register: () => CommandConfig;
	onRun: (stdin: string, args: CommandArgs[]) => Promise<string>;
}

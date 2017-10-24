import * as Commander from 'commander'

export default interface Command {
	description: string
 	args: string
 	name: string
	onRun: (stdin: string, commander: Commander.CommanderStatic)=> Promise<string>
	setUp: (commander: Commander.CommanderStatic)=> void
}

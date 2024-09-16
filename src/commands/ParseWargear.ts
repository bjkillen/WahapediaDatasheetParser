import { Args, Command } from "@oclif/core";

export default class ParseWarger extends Command {
    static override args = {
		srcPath: Args.string(),
	};

	public async run(): Promise<void> {
    }
}
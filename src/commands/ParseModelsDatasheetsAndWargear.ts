import { Args, Command } from "@oclif/core";

import ModelDatasheetParser from "../models/ModelDatasheetParser";

export default class ParseModelsDatasheetsAndWargear extends Command {
	static override args = {
		datasheetsSrcPath: Args.string(),
        wargearSrcPath: Args.string()
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(ParseModelsDatasheetsAndWargear);

        let datasheetResults = await ModelDatasheetParser.ParseFile(args.datasheetsSrcPath);
	}
}
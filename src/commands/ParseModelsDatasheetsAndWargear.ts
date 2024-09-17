import path from "path";
import fs from "fs";

import { Args, Command } from "@oclif/core";

import ModelDatasheetParser from "../models/ModelDatasheetParser";
import WargearParser from "../models/WargearParser";

export default class ParseModelsDatasheetsAndWargear extends Command {
	static override args = {
		datasheetsSrcPath: Args.string(),
        wargearSrcPath: Args.string()
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(ParseModelsDatasheetsAndWargear);

        let datasheetResults = await ModelDatasheetParser.ParseFile(args.datasheetsSrcPath);
		let wargearResults = await WargearParser.ParseFile(args.wargearSrcPath);

		wargearResults.forEach((wargear) => {
			if (datasheetResults.has(wargear.datasheetId)) {
				datasheetResults.get(wargear.datasheetId).wargear.push(wargear)
			}
		});

		const data = JSON.stringify(Object.fromEntries(datasheetResults));

		fs.writeFile(`ExportedDatasheets.json`, data, (error) => {
			if (error) {
				// logging the error
				console.error(error);

				throw error;
			}

			console.log('Export Complete!');
		});
	}
}
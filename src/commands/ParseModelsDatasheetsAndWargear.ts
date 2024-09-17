import fs from "fs";

import { Args, Command } from "@oclif/core";

import ModelDatasheetParser from "../models/ModelDatasheetParser";
import WargearParser from "../models/WargearParser";
import UnitDatasheetParser from "../models/UnitDatasheetParser";
import FactionParser from "../models/FactionParser";
import { UnitDatasheet } from "gamesworkshopcalculator.common";

export default class ParseModelsDatasheetsAndWargear extends Command {
	static override args = {
		factionsSrcPath: Args.string(),
		unitDatasheetsSrcPath: Args.string(),
		modelDatasheetsSrcPath: Args.string(),
        wargearSrcPath: Args.string()
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(ParseModelsDatasheetsAndWargear);

		let unitDatasheetResults = await UnitDatasheetParser.ParseFile(args.unitDatasheetsSrcPath);
        let modelDatasheetResults = await ModelDatasheetParser.ParseFile(args.modelDatasheetsSrcPath);

		modelDatasheetResults.forEach((modelDatasheet) => {
			if (unitDatasheetResults.has(modelDatasheet.datasheetId)) {
				unitDatasheetResults.get(modelDatasheet.datasheetId).modelDatasheets.push(modelDatasheet);
			}
		})

		const wargearResults = await WargearParser.ParseFile(args.wargearSrcPath);

		wargearResults.forEach((wargear) => {
			if (unitDatasheetResults.has(wargear.datasheetId)) {
			unitDatasheetResults.get(wargear.datasheetId).wargear.push(wargear)
			}
		});

		const factionResults = await FactionParser.ParseFile(args.factionsSrcPath);

		unitDatasheetResults.forEach((unitDatasheet) => {
			if (factionResults.has(unitDatasheet.factionId)) {
				factionResults.get(unitDatasheet.factionId).unitDatasheets.push(unitDatasheet);
			} 
		});

		const data = JSON.stringify(Object.fromEntries(factionResults));

		fs.writeFile(`ExportedFactionsWithDatasheets.json`, data, (error) => {
			if (error) {
				// logging the error
				console.error(error);

				throw error;
			}

			console.log('Export Complete!');
		});
	}
}
import { Args, Command } from "@oclif/core";

import { ModelDatasheetEntry } from "../models/ModelDatasheetEntry";
import WahapediaExportParser from "../models/WahapediaExportParser";

export default class ParseModelsDatasheetsAndWargear extends Command {
	static override args = {
		datasheetsSrcPath: Args.string(),
        wargearSrcPath: Args.string()
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(ParseModelsDatasheetsAndWargear);

        let datasheetResults = await WahapediaExportParser.ParseFile<ModelDatasheetEntry>(args.datasheetsSrcPath, this.mapToModelDatasheetEntry);
	}

    private mapToModelDatasheetEntry(data: any): [string, ModelDatasheetEntry] {
        const value = new ModelDatasheetEntry(
            data['datasheet_id'],
            data['name'] ?? '',
            data['T'] ?? 0,
            data['Sv'] ?? 0,
            data['inv_sv'] ?? 0,
            data['W'] ?? 0
        )

        return [value.id, value];
    }
}
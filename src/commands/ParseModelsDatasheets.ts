import { Args, Command } from "@oclif/core";

import csv from "csv-parser";
import * as path from "path";
import fs from "fs";
import { ModelDatasheetEntry } from "../models/ModelDatasheetEntry";

export default class ParseModelsDatasheets extends Command {
	static override args = {
		srcPath: Args.string(),
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(ParseModelsDatasheets);

        const columnSeparator = "|";
        let results: ModelDatasheetEntry[] = [];

        return new Promise((resolve) => {
            fs.createReadStream(args.srcPath)
                .pipe(csv({
                    separator: columnSeparator,
                    mapHeaders: ({ header, index }) => header.trim(),
                    quote: '\''
                }))
                .on('data', (data) => results.push(this.mapToModelDatasheetEntry(data)))
                .on('end', () => {
                    const data = JSON.stringify(results);
                    const fileName = path.parse(args.srcPath).name;

                    fs.writeFile(`${fileName}.json`, data, (error) => {
                        if (error) {
                            // logging the error
                            console.error(error);

                            throw error;
                        }

                        resolve();
                    });
                });
        });
	}

    private mapToModelDatasheetEntry(data: any): ModelDatasheetEntry {
        return new ModelDatasheetEntry(
            data['datasheet_id'],
            data['name'] ?? '',
            data['T'] ?? 0,
            data['Sv'] ?? 0,
            data['inv_sv'] ?? 0,
            data['W'] ?? 0
        )
    }
}
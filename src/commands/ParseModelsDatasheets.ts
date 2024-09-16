import { Args, Command } from "@oclif/core";

import csv from "csv-parser";
import * as path from "path";
import fs from "fs";

export default class ParseModelsDatasheets extends Command {
	static override args = {
		srcPath: Args.string(),
	};

	public async run(): Promise<void> {
		const { args } = await this.parse(ParseModelsDatasheets);

        const columnSeparator = "|";
        let results = [];

        return new Promise((resolve) => {
            fs.createReadStream(args.srcPath)
                .pipe(csv({
                    separator: columnSeparator,
                }))
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    // converting the JSON object to a string
                    const data = JSON.stringify(results);
                    const fileName = path.parse(args.srcPath).name;

                    fs.writeFile(`${fileName}.json`, data, (error) => {
                        // throwing the error
                        // in case of a writing problem
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
}
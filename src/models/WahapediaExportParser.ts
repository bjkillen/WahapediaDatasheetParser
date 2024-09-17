import csv from "csv-parser";
import * as path from "path";
import fs from "fs";

class WahapediaExportParser {
    static async ParseFile<Type>(path: string, mapFunc: (data: any) => [string, Type]) {
        const columnSeparator = "|";
        let results = new Map<string, Type>();

        return new Promise<Map<string, Type>>((resolve) => {
            fs.createReadStream(path)
                .pipe(csv({
                    separator: columnSeparator,
                    mapHeaders: ({ header, index }) => header.trim(),
                    quote: '\''
                }))
                .on('data', (data) => {
                    const mappedData = mapFunc(data);

                    results.set(mappedData[0], mappedData[1]);
                })
                .on('end', () => {
                    resolve(results);
                });
        });
    }
}

export default WahapediaExportParser;
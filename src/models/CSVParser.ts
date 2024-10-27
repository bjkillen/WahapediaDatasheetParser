import csv from "csv-parser";
import fs from "fs";

class CSVParser {
    protected static columnSeparator = ",";

    protected static baseCsvOptions = {
        separator: this.columnSeparator,
        mapHeaders: ({ header }) => header.trim(),
        quote: ''
    };

    static async ParseFile<Type>(path: string, mapFunc: (data: any) => Type) {
        let results: Type[] = [];

        return new Promise<Type[]>((resolve) => {
            fs.createReadStream(path)
                .pipe(csv(this.baseCsvOptions))
                .on('data', (data) => {
                    const mappedData = mapFunc(data);

                    results.push(mappedData);
                })
                .on('end', () => {
                    resolve(results);
                });
        });
    }
    
    static async ParseFileMapped<Type>(path: string, mapFunc: (data: any) => [string, Type]) {
        let results = new Map<string, Type>();

        return new Promise<Map<string, Type>>((resolve) => {
            fs.createReadStream(path)
                .pipe(csv(this.baseCsvOptions))
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

export default CSVParser;
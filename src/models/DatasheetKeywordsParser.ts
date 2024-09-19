import { Keyword } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class KeywordParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFile<Keyword>(path, this.mapToKeywordsEntry);
    }

    private static mapToKeywordsEntry(data: any): Keyword  {
        const value = new Keyword (
            data['datasheet_id'],
            data['keyword'] ?? ''
        )

        return value;
    }
}

export default KeywordParser;
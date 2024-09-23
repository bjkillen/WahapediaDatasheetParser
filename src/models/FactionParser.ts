import { Faction } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class FactionParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFileMapped<Faction>(path, this.mapToFactionEntry);
    }

    private static mapToFactionEntry(data: any): [string, Faction]  {
        const value = new Faction (
            data['id'],
            data['name'] ?? '',
            []
        )

        return [value.id, value];
    }
}

export default FactionParser;
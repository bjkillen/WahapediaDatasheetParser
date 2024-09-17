import { UnitDatasheet } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class UnitDatasheetParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFileMapped<UnitDatasheet>(path, this.mapToUnitDatasheetEntry);
    }

    private static mapToUnitDatasheetEntry(data: any): [string, UnitDatasheet] {
        const value = new UnitDatasheet(
            data['id'],
            data['name'] ?? '',
            data['faction_id'],
            [],
            []
        )

        return [value.id, value];
    }
}

export default UnitDatasheetParser;
import { Ability } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class AbilityParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFileMapped<Ability>(path, this.mapToAbilityEntry);
    }

    private static mapToAbilityEntry(data: any): [string, Ability]  {
        const value = new Ability (
            data['id'],
            data['name'],
        )

        return [value.id, value];
    }
}

export default AbilityParser;
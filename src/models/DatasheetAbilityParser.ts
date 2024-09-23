import { Ability, DatasheetAbility } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class DatasheetAbilityParser {
    private static abilities = new Map<string, Ability>();

    static async ParseFile(path: string, abilities: Map<string, Ability>) {
        DatasheetAbilityParser.abilities = abilities;

        return await WahapediaExportParser.ParseFile<DatasheetAbility>(path, this.mapToDatasheetAbilityEntry);
    }

    private static mapToDatasheetAbilityEntry(data: any): DatasheetAbility  {
        const abilityId = data['ability_id'];
        const mappedAbility = DatasheetAbilityParser .abilities.get(abilityId);

        const value = new DatasheetAbility (
            data['datasheet_id'],
            abilityId,
            mappedAbility?.name ?? '',
            data['parameter']
        )

        return value;
    }
}

export default DatasheetAbilityParser;
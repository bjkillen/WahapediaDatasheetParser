import { DiceSkillValue, UnitDatasheet, Wargear } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class ModelDatasheetParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFileMapped<UnitDatasheet>(path, this.mapToModelDatasheetEntry);
    }

    private static mapToModelDatasheetEntry(data: any): [string, UnitDatasheet] {
        const armorSaveSkill = DiceSkillValue.parseDescription(data['Sv']);
        const invulnerableSaveSkill = DiceSkillValue.parseNumerical(Number(data['inv_sv']));

        const value = new UnitDatasheet(
            data['datasheet_id'],
            data['name'] ?? '',
            data['T'] ?? 0,
            armorSaveSkill?.value,
            invulnerableSaveSkill != null,
            invulnerableSaveSkill?.value,
            [],
            data['W'] ?? 0
        )

        return [value.id, value];
    }
}

export default ModelDatasheetParser;
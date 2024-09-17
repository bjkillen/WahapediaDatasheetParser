import { DiceSkillValue, ModelDatasheet } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class ModelDatasheetParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFile<ModelDatasheet>(path, this.mapToModelDatasheetEntry);
    }

    private static mapToModelDatasheetEntry(data: any): ModelDatasheet {
        const armorSaveSkill = DiceSkillValue.parseDescription(data['Sv']);
        const invulnerableSaveSkill = DiceSkillValue.parseNumerical(Number(data['inv_sv']));

        const value = new ModelDatasheet(
            data['datasheet_id'],
            data['name'] ?? '',
            Number(data['T']) ?? 0,
            armorSaveSkill,
            invulnerableSaveSkill != null,
            invulnerableSaveSkill,
            Number(data['W']) ?? 0
        )

        return value;
    }
}

export default ModelDatasheetParser;
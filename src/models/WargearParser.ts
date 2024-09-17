import { DiceSkillValue, Wargear } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class WargearParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFile<Wargear>(path, this.mapToWargearEntry);
    }

    private static mapToWargearEntry(data: any): Wargear {
        const wargearSkill = DiceSkillValue.parseNumerical(Number(data['BS_WS']));

        const value = new Wargear(
            data['datasheet_id'],
            data['name'] ?? '',
            data['description'] ?? '',
            data['A'] ?? 0,
            wargearSkill?.value,
            data['S'] ?? 0,
            data['AP'] ?? 0,
            data['D'] ?? 0
        )

        return value;
    }
}

export default WargearParser;
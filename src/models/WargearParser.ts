import { DiceSkillValue, Wargear, WargearType } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class WargearParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFile<Wargear>(path, this.mapToWargearEntry);
    }

    private static mapToWargearEntry(data: any): Wargear {
        const wargearType = WargearType.parse(data['type']);
        const wargearSkill = DiceSkillValue.parseNumerical(Number(data['BS_WS']));

        const value = new Wargear(
            data['datasheet_id'],
            data['name'] ?? '',
            data['description'] ?? '',
            Number(data['range']),
            wargearType,
            data['A'],
            wargearSkill,
            Number(data['S']) ?? 0,
            Number(data['AP']) ?? 0,
            data['D']
        )

        return value;
    }
}

export default WargearParser;
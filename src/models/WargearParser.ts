import { DiceSkillValue, RegexExtension, Wargear, WargearType } from "gamesworkshopcalculator.common";
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
            RegexExtension.matchNumber(data['range']),
            wargearType,
            data['A'],
            wargearSkill,
            RegexExtension.matchNumber(data['S']) ?? 0,
            RegexExtension.matchNumber(data['AP']) ?? 0,
            data['D']
        )

        return value;
    }
}

export default WargearParser;
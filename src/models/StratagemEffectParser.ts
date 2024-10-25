import { DiceRerollModifierValue, DiceSkillValue, RegexExtension, StratagemEffect } from "gamesworkshopcalculator.common";
import CSVParser from "./CSVParser";
import StringExtension from "../extensions/StringExtension";

class StratagemEffectParser {
    static async ParseFile(path: string) {
        return await CSVParser.ParseFileMapped<StratagemEffect>(
            path,
            this.mapToStratagemEffectEntry
        );
    }

    private static mapToStratagemEffectEntry(data: any): [string, StratagemEffect]  {
        const value = new StratagemEffect(
            data["id"],
            data["faction_id"],
            RegexExtension.matchNumber(data["cp_cost"] ?? ""),
            data["restriction"],
            StringExtension.parseBoolean(data["question"]),
            RegexExtension.matchNumber(data['sustained_hits'] ?? ""),
            DiceSkillValue.parseDescription(data['critical_hits']),
            DiceSkillValue.parseDescription(data['critical_wounds']),
            StringExtension.parseBoolean(data["-1_damage"]),
            DiceSkillValue.parseDescription(data['fnp']),
            StringExtension.parseBoolean(data['to_wound_+1']),
            DiceRerollModifierValue.parseDescriptionLower(data['reroll_hits']),
            RegexExtension.matchNumber(data['bonus_attacks'] ?? ""),
            StringExtension.parseBoolean(data['stealth']),
            RegexExtension.matchNumber(data['bonus_ap'] ?? ""),
            RegexExtension.matchNumber(data['bonus_strength'] ?? ""),
            DiceSkillValue.parseDescription(data['set_bs']),
            StringExtension.parseBoolean(data['to_hit_+1']),
            DiceSkillValue.parseDescription(data['set_inv']),
            StringExtension.parseBoolean(data['to_wound_-1']),
            StringExtension.parseBoolean(data['lethal_hits']),
            []
        );

        return [value.stratagemID, value];
    }
}

export default StratagemEffectParser;
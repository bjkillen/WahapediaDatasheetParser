import { DiceRerollModifierValue, DiceSkillValue, Keyword, RegexExtension, StratagemEffect, StratagemType } from "gamesworkshopcalculator.common";
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
        let datasheetRestrictions = [];

        if (data["restriction"] != null && (data["restriction"] as string).length > 0) {
            datasheetRestrictions = data["restriction"]
                ?.split("-")
                .map((dr: string) => new Keyword(undefined, dr));
        }

        const value = new StratagemEffect(
            data["id"],
            data["faction_id"],
            RegexExtension.matchNumber(data["cp_cost"] ?? ""),
            datasheetRestrictions ?? [],
            StringExtension.parseBoolean(data["question"]),
            StratagemType.parseDescriptionLower(data["type"]),
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
            RegexExtension.matchNumber(data["reduce_ap"] ?? ""),
            []
        );

        return [value.stratagemID, value];
    }
}

export default StratagemEffectParser;
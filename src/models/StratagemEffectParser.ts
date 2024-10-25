import { DiceRerollModifierValue, DiceSkillValue, RegexExtension, StratagemEffect } from "gamesworkshopcalculator.common";
import CSVParser from "./CSVParser";

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
            new Boolean(data["question"]).valueOf(),
            RegexExtension.matchNumber(data['sustained_hits'] ?? ""),
            DiceSkillValue.parseDescription(data['critical_hits']),
            DiceSkillValue.parseDescription(data['critical_wounds']),
            new Boolean(data["-1_damage"]).valueOf(),
            DiceSkillValue.parseDescription(data['fnp']),
            new Boolean(data['to_wound_+1']).valueOf(),
            DiceRerollModifierValue.parseDescriptionLower(data['reroll_hits']),
            RegexExtension.matchNumber(data['bonus_attacks'] ?? ""),
            new Boolean(data['stealth']).valueOf(),
            RegexExtension.matchNumber(data['bonus_ap'] ?? ""),
            RegexExtension.matchNumber(data['bonus_strength'] ?? ""),
            DiceSkillValue.parseDescription(data['set_bs']),
            new Boolean(data['to_hit_+1']).valueOf(),
            DiceSkillValue.parseDescription(data['set_inv']),
            new Boolean(data['to_wound_-1']).valueOf(),
            new Boolean(data['lethal_hits']).valueOf(),
            []
        );

        return [value.stratagemID, value];
    }
}

export default StratagemEffectParser;
import { DiceRerollModifierValue, DiceSkillValue, RegexExtension, StratagemQuestion } from "gamesworkshopcalculator.common";
import CSVParser from "./CSVParser";
import StringExtension from "../extensions/StringExtension";

class StratagemQuestionParser {
    static async ParseFile(path: string) {
        return await CSVParser.ParseFile<StratagemQuestion>(
            path,
            this.mapToStratagemQuestionEntry
        );
    }

    private static mapToStratagemQuestionEntry(data: any): StratagemQuestion  {
        const value = new StratagemQuestion(
            data["stratagem_id"],
            data["question_text"],
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
            RegexExtension.matchNumber(data['bonus_str'] ?? ""),
            DiceSkillValue.parseDescription(data['set_bs']),
            StringExtension.parseBoolean(data['to_hit_+1']),
            DiceSkillValue.parseDescription(data['set_inv']),
            StringExtension.parseBoolean(data['to_wound_-1']),
            StringExtension.parseBoolean(data['lethal_hits']),
            RegexExtension.matchNumber(data["reduce_ap"] ?? ""),
            StringExtension.parseBoolean(data["dev_wounds"]),
            DiceRerollModifierValue.parseDescriptionLower(data['reroll_wounds']),
            RegexExtension.matchNumber(data['bonus_damage']),
            StringExtension.parseBoolean(data["transhuman"]),
        );

        return value;
    }
}

export default StratagemQuestionParser;
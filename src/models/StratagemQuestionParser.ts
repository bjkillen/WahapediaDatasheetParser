import { StratagemQuestion } from "gamesworkshopcalculator.common";
import CSVParser from "./CSVParser";

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
            data["modifier"] ?? 0
        );

        return value;
    }
}

export default StratagemQuestionParser;
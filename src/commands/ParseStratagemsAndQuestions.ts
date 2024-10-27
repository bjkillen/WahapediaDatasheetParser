import fs from "fs";

import { Args, Command } from "@oclif/core";
import path from "path";

import StratagemParser from "../models/StratagemParser";
import StratagemEffectParser from "../models/StratagemEffectParser";
import StratagemQuestionParser from "../models/StratagemQuestionParser";
import { DetachmentStratagems, FactionStratagemsMap, TypedJSON } from "gamesworkshopcalculator.common";
import FactionParser from "../models/FactionParser";

export default class ParseStratagemsAndQuestions extends Command {
    static override args = {
        srcDir: Args.string(),
    };

    public async run(): Promise<void> {
        const { args } = await this.parse(ParseStratagemsAndQuestions);

        let stratagemEffectResults = await StratagemEffectParser.ParseFile(
            path.join(args.srcDir, "StratagemEffects.csv")
        )

        let stratagemQuestionResults = await StratagemQuestionParser.ParseFile(
            path.join(args.srcDir, "StratagemQuestions.csv")
        )

        stratagemQuestionResults.forEach((sq) => {
            if (stratagemEffectResults.has(sq.stratagemID)) {
				stratagemEffectResults.get(sq.stratagemID).questions.push(sq)
			}
        })

        let stratagemResults = await StratagemParser.ParseFile(
            path.join(args.srcDir, "Stratagems.csv")
        );

        stratagemEffectResults.forEach((se) => {
            if (stratagemResults.has(se.stratagemID)) {
				stratagemResults.get(se.stratagemID).stratagemEffect = se;
			}
        })

        const factionDetachmentResults = await FactionParser.ParseFileForStratagems(
			path.join(args.srcDir, 'Factions.csv'));

        stratagemResults.forEach((sr) => {
			if (factionDetachmentResults.has(sr.factionID)) {
                const factionDetachments = factionDetachmentResults.get(sr.factionID);

				if (!factionDetachments.detachments.has(sr.detachment)) {
                    factionDetachments.detachments.set(sr.detachment, new DetachmentStratagems(
                        sr.detachment,
                        []
                    ));
                }

                factionDetachments.detachments.get(sr.detachment)?.stratagems.push(sr);
			}
		});

        const serializer = new TypedJSON(FactionStratagemsMap);

        const data = serializer.stringify(new FactionStratagemsMap(factionDetachmentResults));

		fs.writeFile(`ExportedStratagems.json`, data, (error) => {
			if (error) {
				// logging the error
				console.error(error);

				throw error;
			}

            console.log(`Factions Parsed: ${factionDetachmentResults.size}`);
			console.log(`Stratagems Parsed: ${stratagemResults.size}`);
			console.log(`Stratagem Effects Parsed: ${stratagemEffectResults.size}`);
			console.log(`Stratagem Questions Parsed: ${stratagemQuestionResults.length}`);

			console.log('Export Complete!');
		});
    }
}

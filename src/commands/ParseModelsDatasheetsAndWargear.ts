import fs from "fs";

import { Args, Command } from "@oclif/core";
import path from "path";

import ModelDatasheetParser from "../models/ModelDatasheetParser";
import WargearParser from "../models/WargearParser";
import UnitDatasheetParser from "../models/UnitDatasheetParser";
import FactionParser from "../models/FactionParser";
import { TypedJSON, FactionsMap } from "gamesworkshopcalculator.common";
import KeywordParser from "../models/DatasheetKeywordsParser";
import DatasheetAbilityParser from "../models/DatasheetAbilityParser";
import AbilityParser from "../models/AbilityParser";

export default class ParseModelsDatasheetsAndWargear extends Command {
  static override args = {
    srcDir: Args.string(),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(ParseModelsDatasheetsAndWargear);

    let unitDatasheetResults = await UnitDatasheetParser.ParseFile(
      path.join(args.srcDir, "Datasheets.csv")
    );

    let modelDatasheetResults = await ModelDatasheetParser.ParseFile(
      path.join(args.srcDir, "Datasheets_models.csv")
    );

    modelDatasheetResults.forEach((modelDatasheet) => {
      if (unitDatasheetResults.has(modelDatasheet.datasheetId)) {
        unitDatasheetResults
          .get(modelDatasheet.datasheetId)
          .modelDatasheets.push(modelDatasheet);
      }
    });

    const wargearResults = await WargearParser.ParseFile(
      path.join(args.srcDir, "Datasheets_wargear.csv")
    );

    wargearResults.forEach((wargear) => {
      if (unitDatasheetResults.has(wargear.datasheetId)) {
        unitDatasheetResults.get(wargear.datasheetId).wargear.push(wargear);
      }
    });

    const keywordsResults = await KeywordParser.ParseFile(
      path.join(args.srcDir, "Datasheets_keywords.csv")
    );

    keywordsResults.forEach((keyword) => {
      if (unitDatasheetResults.has(keyword.datasheetId)) {
        unitDatasheetResults.get(keyword.datasheetId).keywords.push(keyword);
      }
    });

    const abilitiesResults = await AbilityParser.ParseFile(
      path.join(args.srcDir, "Abilities.csv")
    );

    const datasheetAbilitiesResults = await DatasheetAbilityParser.ParseFile(
      path.join(args.srcDir, "Datasheets_abilities.csv"),
      abilitiesResults
    );

    datasheetAbilitiesResults.forEach((datasheetAbility) => {
      if (unitDatasheetResults.has(datasheetAbility.datasheetId)) {
        unitDatasheetResults
          .get(datasheetAbility.datasheetId)
          .abilities.push(datasheetAbility);
      }
    });

    const factionResults = await FactionParser.ParseFile(
      path.join(args.srcDir, "Factions.csv")
    );

    unitDatasheetResults.forEach((unitDatasheet) => {
      if (factionResults.has(unitDatasheet.factionId)) {
        factionResults
          .get(unitDatasheet.factionId)
          .unitDatasheets.push(unitDatasheet);
      } else {
        console.log(unitDatasheet.factionId);
      }
    });

    const serializer = new TypedJSON(FactionsMap);
    const data = serializer.stringify(new FactionsMap(factionResults));

    fs.writeFile(`ExportedFactionsWithDatasheets.json`, data, (error) => {
      if (error) {
        // logging the error
        console.error(error);

        throw error;
      }

      console.log(`Units Parsed: ${unitDatasheetResults.size}`);
      console.log(`Models Parsed: ${modelDatasheetResults.length}`);
      console.log(`Wargear Parsed: ${wargearResults.length}`);

      console.log("Export Complete!");
    });
  }
}

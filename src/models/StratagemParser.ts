import { Stratagem } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class StratagemParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFileMapped<Stratagem>(
            path,
            this.mapToStratagemEntry
        );
    }

    private static mapToStratagemEntry(data: any): [string, Stratagem]  {
        const value = new Stratagem(
            data["id"],
            data["faction_id"],
            data["name"] ?? "",
            data["turn"],
            data["phase"],
            data["detachment"],
            data["description"],
            undefined
        );

        return [value.id, value];
    }
}

export default StratagemParser;

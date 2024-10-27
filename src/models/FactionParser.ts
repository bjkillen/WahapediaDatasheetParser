import { DetachmentStratagems, Faction, FactionDetachments } from "gamesworkshopcalculator.common";
import WahapediaExportParser from "./WahapediaExportParser";

class FactionParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFileMapped<Faction>(path, this.mapToFactionEntry);
    }

    private static mapToFactionEntry(data: any): [string, Faction]  {
        const value = new Faction (
            data['id'],
            data['name'] ?? '',
            []
        )

        return [value.id, value];
    }

    static async ParseFileForStratagems(path: string) {
        return await WahapediaExportParser.ParseFileMapped<FactionDetachments>(path, this.mapToFactionStratagemEntry);
    }

    private static mapToFactionStratagemEntry(data: any): [string, FactionDetachments]  {
        const value = new FactionDetachments (
            data['id'],
            data['name'] ?? '',
            new Map<string, DetachmentStratagems>
        )

        return [value.id, value];
    }
}

export default FactionParser;
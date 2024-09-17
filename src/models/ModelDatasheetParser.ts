import { ModelDatasheetEntry } from "./ModelDatasheetEntry";
import WahapediaExportParser from "./WahapediaExportParser";

class ModelDatasheetParser {
    static async ParseFile(path: string) {
        return await WahapediaExportParser.ParseFile<ModelDatasheetEntry>(path, this.mapToModelDatasheetEntry);
    }

    private static mapToModelDatasheetEntry(data: any): [string, ModelDatasheetEntry] {
        const value = new ModelDatasheetEntry(
            data['datasheet_id'],
            data['name'] ?? '',
            data['T'] ?? 0,
            data['Sv'] ?? 0,
            data['inv_sv'] ?? 0,
            data['W'] ?? 0
        )

        return [value.id, value];
    }
}

export default ModelDatasheetParser;
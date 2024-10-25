import CSVParser from "./CSVParser";

class WahapediaExportParser extends CSVParser {
    static override columnSeparator = "|";
}

export default WahapediaExportParser;
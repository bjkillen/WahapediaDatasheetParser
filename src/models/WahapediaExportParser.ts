import CSVParser from "./CSVParser";

class WahapediaExportParser extends CSVParser {
    protected static override columnSeparator = "|";
    protected static override baseCsvOptions = {
        separator: this.columnSeparator,
        mapHeaders: ({ header }) => header.trim(),
        quote: ''
    };
}

export default WahapediaExportParser;
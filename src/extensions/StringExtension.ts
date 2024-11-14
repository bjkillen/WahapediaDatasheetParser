export default class StringExtension {
    static parseBoolean(value: string | undefined): boolean | undefined {
        if (value == null) {
            return undefined;
        }

        return value.toLocaleLowerCase() === "true";
    }
}

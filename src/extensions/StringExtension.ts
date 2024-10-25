export default class StringExtension {
    static parseBoolean(value: string | undefined) {
        return value.toLocaleLowerCase() === "true";
    }
}
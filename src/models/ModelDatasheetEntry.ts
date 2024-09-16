export class ModelDatasheetEntry {
    constructor(
        public id: string,
        public name: string,
        public toughness: number,
        public armorSaveSkill: number,
        public invulnerableSave: number,
        public wounds: number,
    ) {}
}
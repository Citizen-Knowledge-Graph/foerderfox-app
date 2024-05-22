export class PersonalisedScreenData {
  constructor() {
    this.sectionFieldCards = [];
  }

  addSectionFieldCard(sectionFieldCard) {
    this.sectionFieldCards.push(sectionFieldCard);
  }
}

export class SectionFieldCard {
  constructor(datafield, title, datatype, options, objectClass) {
    this.datafield = datafield;
    this.title = title;
    this.datatype = datatype;
    this.options = options;
    this.objectClass = objectClass;
  }
}

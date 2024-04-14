export class HomeScreenData {
  constructor() {
    this.eligible = [];
    this.nonEligible = [];
    this.missingData = [];
  }

  addEligible(value) {
    this.eligible.push(value);
  }

  addNonEligible(value) {
    this.nonEligible.push(value);
  }

  addMissingData(value) {
    this.missingData.push(value);
  }
}

export class SchemeData {
  constructor(key) {
    this.key = key;
    this.title = null;
    this.description = null;
  }

  setTitle(value) {
    this.title = value;
  }

  setDescription(value) {
    this.description = value;
  }
}

// models/Word.js

class Word {
  constructor({ wordTypeId, semesterId, name }) {
    this.wordTypeId = wordTypeId; // required
    this.semesterId = semesterId;
    this.name = name; // required
  }

  toJSON() {
    return {
      semesterId: this.semesterId,
      wordTypeId: this.wordTypeId,
      name: this.name,
    };
  }

  static validate(data) {
    if (!data.name || !data.wordTypeId || !data.semesterId ) {
      throw new Error("Missing required fields: wordTypeId or name or semesterId");
    }
    return new Word(data);
  }
}

module.exports = Word;

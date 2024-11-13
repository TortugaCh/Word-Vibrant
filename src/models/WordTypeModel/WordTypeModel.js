// models/WordType.js

class WordType {
  constructor({ type }) {
    this.type = type; // e.g., { grade1: ["word1", "word2"], grade2: [...] }
  }

  toJSON() {
    return {
      type: this.type,
    };
  }

  static validate(data) {
    if (!data.type) {
      throw new Error("Missing required fields: type or semesterId");
    }
    return new WordType(data);
  }
}

module.exports = WordType;

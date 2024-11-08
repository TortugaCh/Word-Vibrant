// models/Grade.js

class Grade {
  constructor({ name, words }) {
    this.name = name; // required
    this.words = words;
  }

  toJSON() {
    return {
      name: this.name,
      words: this.words,
    };
  }

  static validate(data) {
    if (!data.words || !data.name) {
      throw new Error("Missing required fields: words or name");
    }
    return new Grade(data);
  }
}

module.exports = Grade;

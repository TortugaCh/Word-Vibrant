// models/Curriculum.js

class Curriculum {
  constructor({ name }) {
    this.name = name; // required
    this.description = `for curriculum ${name}`; // e.g., { grade1: ["word1", "word2"], grade2: [...] }
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
    };
  }

  static validate(data) {
    if (!data.name) {
      throw new Error("Missing required fields: name");
    }
    return new Curriculum(data);
  }
}

module.exports = Curriculum;

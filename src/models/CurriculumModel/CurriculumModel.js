// models/Curriculum.js

class Curriculum {
  constructor({ name, gradeId }) {
    this.name = name; // required
    this.gradeId = gradeId; // e.g., { grade1: ["word1", "word2"], grade2: [...] }
  }

  toJSON() {
    return {
      name: this.name,
      gradeId: this.gradeId,
    };
  }

  static validate(data) {
    if (!data.gradeId || !data.name) {
      throw new Error("Missing required fields: curriculumId or name");
    }
    return new Curriculum(data);
  }
}

module.exports = Curriculum;

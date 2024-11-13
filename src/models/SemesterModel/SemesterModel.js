// models/Semester.js

class Semester {
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
    if (!data.name || !data.gradeId) {
      throw new Error("Missing required fields: gradeId or name");
    }
    return new Semester(data);
  }
}

module.exports = Semester;

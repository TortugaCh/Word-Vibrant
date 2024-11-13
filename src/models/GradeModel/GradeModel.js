// models/Grade.js

class Grade {
  constructor({ name, curriculumId }) {
    this.name = name; // required
    this.curriculumId = curriculumId;
  }

  toJSON() {
    return {
      name: this.name,
      curriculumId: this.curriculumId,
    };
  }

  static validate(data) {
    if (!data.curriculumId || !data.name) {
      throw new Error("Missing required fields: curriculumId or name");
    }
    return new Grade(data);
  }
}

module.exports = Grade;

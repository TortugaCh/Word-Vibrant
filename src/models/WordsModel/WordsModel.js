// models/Word.js

class Word {
  constructor({ name, curriculum, semester, grade, wordType }) {
    this.name = name; // required
    this.curriculum = curriculum; // required
    this.semester = semester; // required
    this.grade = grade; // required
    this.wordType = wordType; // required
  }

  toJSON() {
    return {
      name: this.name,
      curriculum: this.curriculum,
      semester: this.semester,
      grade: this.grade,
      wordType: this.wordType,
    };
  }

  static validate(data) {
    if (
      !data.name ||
      !data.curriculum ||
      !data.semester ||
      !data.grade ||
      !data.wordType
    ) {
      throw new Error(
        "Missing required fields: name or curriculum or semester or grade or wordType"
      );
    }
    return new Word(data);
  }
}

module.exports = Word;

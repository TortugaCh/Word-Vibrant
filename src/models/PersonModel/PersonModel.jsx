// models/User.js

class Person {
  constructor({
    userId,
    name,
    email,
    credits = 0,
    plan = "Free",
    curriculum = null,
    gradeLevel = null,
    createdAt = new Date(),
  }) {
    this.userId = userId; // required
    this.name = name; // required
    this.email = email; // required
    this.credits = credits;
    this.plan = plan;
    this.curriculum = curriculum;
    this.gradeLevel = gradeLevel;
    this.createdAt = createdAt;
  }

//   // Method to create Firestore document format
  toJSON() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      credits: this.credits,
      plan: this.plan,
      curriculum: this.curriculum,
      gradeLevel: this.gradeLevel,
      createdAt: this.createdAt,
    };
  }

  // Optional static method to validate data before creating user instance
  static validate(data) {
    if (!data.userId || !data.name || !data.email) {
      throw new Error("Missing required fields: userId, name, or email");
    }
    return new Person(data);
  }
}

export default Person;

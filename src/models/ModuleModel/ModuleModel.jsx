// models/Module.js

class Module {
  constructor({
    name,
    description,
    creditCost,
    gradeLevels = [],
    available = true,
  }) {
    this.name = name; // required
    this.description = description;
    this.creditCost = creditCost;
    this.gradeLevels = gradeLevels;
    this.available = available;
  }

  toJSON() {
      return {
        moduleId: this.moduleId,
        name: this.name,
        description: this.description,
        creditCost: this.creditCost,
        gradeLevels: this.gradeLevels,
        available: this.available,
      };
    }

  static validate(data) {
    if (!data.name || typeof data.creditCost === "undefined") {
      throw new Error("Missing required fields: moduleId, name, or creditCost");
    }
    return new Module(data);
  }
}

export default Module;

class PricingPlan {
  constructor({productId,name, priceId, cost = 0, credits = 5, features = {}}) {
    this.productId = productId;
    this.name = name;
    this.priceId = priceId;
    this.cost = cost;
    this.credits = credits;
    this.features = features;
  }

  toJSON() {
    return {
      productId: this.productId,
      name: this.name,
      priceId: this.priceId,
      cost: this.cost,
      credits: this.credits,
      features: this.features,
    };
  }

  static validate(data) {
    if (!data.name || !data.priceId) {
      throw new Error("Missing required fields: name or priceId");
    }
    return new PricingPlan(data);
  }
}

export default PricingPlan;

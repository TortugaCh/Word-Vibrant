class SubscriptionModel {
  constructor({
    userId,
    planId,
    name,
    startedAt = new Date(),
    endedAt = null, // Placeholder; will be set based on startedAt
  }) {
    this.userId = userId;
    this.planId = planId;
    this.name = name;
    this.startedAt = startedAt;
    this.endedAt =
      endedAt || new Date(startedAt.setFullYear(startedAt.getFullYear() + 1)); // Set endedAt one year after startedAt
  }

  toJSON() {
    return {
      userId: this.userId,
      planId: this.planId,
      name: this.name,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
    };
  }
}

export default SubscriptionModel;

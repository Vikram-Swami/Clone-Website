class RewardsModel {
  constructor(id, range, rule, type, status, reward, salary, claim, claimed, createdAt, updatedAt) {
    this.id = id;
    this.range = range;
    this.rule = rule;
    this.type = type;
    this.status = status;
    this.reward = reward;
    this.salary = salary;
    this.claim = claim;
    this.claimed = claimed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromJson(jsonData) {
    return new RewardsModel(
      jsonData._id ?? null,
      jsonData.range,
      jsonData.rule,
      jsonData.type,
      jsonData.status ?? true,
      jsonData.reward,
      jsonData.salary,
      jsonData.claim,
      jsonData.claimed,
      jsonData.createdAt ?? new Date(),
      jsonData.updatedAt ?? new Date()
    );
  }

  fromArray(jsonData) {
    let data = [];
    for (let json of jsonData) {
      data.push(
        new RewardsModel(
          json._id ?? "",
          json.range ?? null,
          json.rule ?? null,
          json.type ?? null,
          json.status ?? null,
          json.reward ?? null,
          json.salary ?? null,
          json.claim ?? null,
          json.claimed ?? null,
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
    return data;
  }
}

export default RewardsModel;

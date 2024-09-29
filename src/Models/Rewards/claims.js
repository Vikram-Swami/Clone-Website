class Claims {
  constructor(id, userId, rewardId, type, status, reward, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.rewardId = rewardId;
    this.type = type;
    this.status = status;
    this.reward = reward;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromArray(jsonData) {
    let data = [];
    for (let json of jsonData) {
      data.push(
        new Claims(
          json._id ?? "",
          json.userId ?? null,
          json.rewardId ?? null,
          json.type ?? null,
          json.status ?? null,
          json.reward ?? null,
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
    return data;
  }
}

export default Claims;

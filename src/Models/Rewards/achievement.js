class Achievement {
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

  fromJson(jsonData) {
    return new Achievement(
      jsonData._id ?? null,
      jsonData.userId,
      jsonData.rewardId,
      jsonData.type,
      jsonData.status ?? true,
      jsonData.reward,
      jsonData.createdAt ?? new Date(),
      jsonData.updatedAt ?? new Date()
    );
  }

  fromArray(jsonData) {
    let data = [];
    for (let json of jsonData) {
      data.push(
        new Achievement(
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

export default Achievement;

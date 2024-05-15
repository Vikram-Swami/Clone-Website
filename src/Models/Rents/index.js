class RentModel {
  constructor(
    id,
    userId,
    source,
    level,
    storage,
    type,
    amount,
    connectionId,
    status,
    endDate,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.userId = userId;
    this.level = level;
    this.source = source;
    this.storage = storage;
    this.type = type;
    this.amount = amount;
    this.connectionId = connectionId;
    this.status = status;
    this.endDate = new Date(endDate);
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  fromJson(jsonData) {
    return new RentModel(
      jsonData._id ?? null,
      jsonData.userId,
      jsonData.level,
      jsonData.source,
      jsonData.storage,
      jsonData.type,
      jsonData.amount,
      jsonData.connectionId,
      jsonData.status,
      jsonData.endDate,
      jsonData.createdAt ?? new Date(),
      jsonData.updatedAt ?? new Date()
    );
  }

  fromArray(jsonDataArray) {
    let data = [];
    for (let json of jsonDataArray) {
      data.push(
        new RentModel(
          json._id ?? null,
          json.userId,
          json.level,
          json.source,
          json.storage,
          json.type,
          json.amount,
          json.connectionId,
          json.status,
          json.endDate,
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
    return data;
  }
}

export default RentModel;

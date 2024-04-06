class IncomeLog {
  constructor(id, userId, sourceId, amount, level, tds, conCharge, type, status, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.sourceId = sourceId;
    this.amount = amount;
    this.level = level;
    this.tds = tds;
    this.conCharge = conCharge;
    this.type = type;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromArray(jsonData) {
    let data = [];
    for (let json of jsonData) {
      data.push(
        new IncomeLog(
          json._id ?? null,
          json.userId,
          json.sourceId,
          json.amount,
          json.level,
          json.tds,
          json.conCharge,
          json.type ?? "",
          json.status ?? false,
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
    return data;
  }
}

export default IncomeLog;

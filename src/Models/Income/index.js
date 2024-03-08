class IncomeLog {
  constructor(id, userId, amount, type, tds, status, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
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
          json.amount,
          json.type ?? "",
          json.status ?? false,
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
  }
}

export default IncomeLog;

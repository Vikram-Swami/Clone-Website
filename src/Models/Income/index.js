class IncomeLog {
  constructor(id, userId, sourceId, sourceName, amount, level, tds, conCharge, type, status, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.sourceId = sourceId;
    this.sourceName = sourceName;
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
      const dateObject = new Date(json.createdAt);
      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);


      data.push(
        new IncomeLog(
          json._id ?? null,
          json.userId,
          json.sourceId,
          json.sourceName,
          json.amount,
          json.level,
          json.tds,
          json.conCharge,
          json.type ?? "",
          json.status ?? false,
          formattedDate ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
    return data;
  }
}

export default IncomeLog;

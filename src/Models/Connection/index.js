class ConnectionsModel {
    constructor(
        id,
        userId,
        storage,
        amount,
        tax,
        storageId,
        url,
        transactionId,
        serialNo,
        createdAt,
    ) {
        this.id = id;
        this.userId = userId;
        this.storage = storage;
        this.amount = amount;
        this.tax = tax;
        this.storageId = storageId,
            this.url = url,
            this.transactionId = transactionId;
        this.serialNo = serialNo;
        this.createdAt = createdAt;
    }

    fromJson(jsonData) {
        return new ConnectionsModel(
            jsonData._id ?? null,
            jsonData.userId,
            jsonData.storage ?? 0,
            jsonData.amount ?? 0,
            jsonData.tax ?? 18.0,
            jsonData.storageId ?? "",
            jsonData.url ?? "",
            jsonData.transactionId ?? null,
            jsonData.serialNo ?? "",
            jsonData.createdAt ?? new Date(),
        );
    }


}

export default ConnectionsModel;

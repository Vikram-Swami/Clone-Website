class ConnectionsModel {
    constructor(
        id,
        userId,
        storage,
        amount,
        tax,
        status,
        isAlloted,
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
        this.status = status;
        this.isAlloted = isAlloted;
        this.storageId = storageId;
        this.url = url;
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
            jsonData.status ?? false,
            jsonData.isAlloted ?? false,
            jsonData.storageId ?? "",
            jsonData.url ?? "",
            jsonData.transactionId ?? null,
            jsonData.serialNo ?? "",
            jsonData.createdAt ?? new Date(),
        );
    }

    fromArray(jsonData) {
        let data = [];
        for (let json of jsonData) {
            data.push(new ConnectionsModel(
                json._id ?? null,
                json.userId,
                json.storage ?? 0,
                json.amount ?? 0,
                json.tax ?? 18.0,
                json.status ?? false,
                json.isAlloted ?? false,
                json.storageId ?? "",
                json.url ?? "",
                json.transactionId ?? null,
                json.serialNo ?? "",
                json.createdAt ?? new Date(),
            ))
        }
        return data;
    }


}

export default ConnectionsModel;

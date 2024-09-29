class ConnectionsModel {
    constructor(
        id,
        userId,
        storage,
        amount,
        rent,
        tax,
        status,
        isAlloted,
        storageId,
        url,
        transactionId,
        serialNo,
        endDate,
        createdAt,
    ) {
        this.id = id;
        this.userId = userId;
        this.storage = storage;
        this.amount = amount;
        this.rent = rent;
        this.tax = tax;
        this.status = status;
        this.isAlloted = isAlloted;
        this.storageId = storageId;
        this.url = url;
        this.transactionId = transactionId;
        this.serialNo = serialNo;
        this.endDate = endDate;
        this.createdAt = createdAt;
    }

    fromArray(jsonData) {
        let data = [];
        for (let json of jsonData) {

            const boughtAt = new Date(json.createdAt);
            const optionsB = { day: "2-digit", month: "2-digit", year: "2-digit" };
            const formatCreated = boughtAt.toLocaleDateString("en-GB", optionsB);
            const endDate = new Date(json.endDate);
            const optionsE = { day: "2-digit", month: "2-digit", year: "2-digit" };
            const formatEnd = endDate.toLocaleDateString("en-GB", optionsE);

            data.push(new ConnectionsModel(
                json._id ?? null,
                json.userId,
                json.storage ?? 0,
                json.amount ?? 0,
                json.rent ?? 0,
                json.tax ?? 18.0,
                json.status ?? false,
                json.isAlloted ?? false,
                json.storageId ?? "",
                json.url ?? "",
                json.transactionId ?? null,
                json.serialNo ?? "",
                json?.endDate && formatEnd,
                formatCreated,
            ))
        }
        return data;
    }


}

export default ConnectionsModel;

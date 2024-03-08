class Notification {
    constructor(id, userId, title, sourceId, sourceType, status, createdAt) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.sourceId = sourceId;
        this.sourceType = sourceType;
        this.status = status;
        this.createdAt = createdAt;
    }
    fromJson(jsonData) {
        return new Notification(
            jsonData._id ?? null,
            jsonData.userId,
            jsonData.title,
            jsonData.sourceId,
            jsonData.sourceType,
            jsonData.status,
            jsonData.createdAt ?? new Date(),
        );
    }

    fromArray(jsonData) {
        let data = [];
        for (let json of jsonData) {
            data.push(new Notification(
                json._id ?? null,
                json.userId,
                json.title,
                json.sourceId,
                json.sourceType,
                json.status,
                json.createdAt ?? new Date(),
            ))
        }
        return data;
    }
}

export default Notification;
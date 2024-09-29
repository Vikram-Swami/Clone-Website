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

            const dateObject = new Date(json.createdAt);
            const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
            const formattedDate = dateObject.toLocaleDateString("en-GB", options);




            data.push(new Notification(
                json._id ?? null,
                json.userId,
                json.title,
                json.sourceId,
                json.sourceType,
                json.status,
                formattedDate ?? new Date(),
            ))
        }
        return data;
    }
}

export default Notification;
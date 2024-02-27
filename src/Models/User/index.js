class UserModel {
    constructor(userId, fullName, email, phone, type, members, wallet, status, ownStr, memStr, usable, earning, createdAt) {
        this.id = userId;
        this.fullName = fullName,
            this.email = email;
        this.phone = phone;
        this.type = type;
        this.members = members;
        this.wallet = wallet;
        this.status = status;
        this.ownStr = ownStr;
        this.memStr = memStr;
        this.usable = usable;
        this.earning = earning;
        this.createdAt = createdAt;
    }

    toJson(jsonData) {
        return new UserModel(
            jsonData.userId ?? null,
            jsonData.fullName ?? "user",
            jsonData.email ?? "",
            jsonData.phone ?? "xxx-xxx-xxxx",
            jsonData.type ?? "",
            jsonData.members ?? 0,
            jsonData.wallet ?? 0,
            jsonData.status ?? false,
            jsonData.storage?.own ?? 0,
            jsonData.storage?.member ?? 0,
            jsonData.storage.usable ?? 0,
            jsonData.earning ?? 0,
            jsonData.createdAt ?? new Date()

        )
    }

    toUpdateJson(form) {
        return {
            userId: this.userId,
            email: this.email,
            phone: this.phone,
            type: this.type
        }

    }
}


export default UserModel;
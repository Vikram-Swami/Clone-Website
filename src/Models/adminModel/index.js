class AdminModel {
  constructor(
    userId,
    initial,
    fullName,
    password,
    email,
    phone,
    image,
    dob,
    status,
    type,
    attempt,
    isVerified,
    createdAt,
    updatedAt
  ) {
    this.userId = userId;
    this.initial = initial;
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.image = image;
    this.dob = dob;
    this.status = status;
    this.type = type;
    this.attempt = attempt;
    this.isVerified = isVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromArray(jsonData) {
    let data = [];
    for (let json of jsonData) {
      data.push(
        new AdminModel(
          json.userId ?? "",
          json.initial ?? "",
          json.fullName ?? "User",
          json.password,
          json.email ?? "",
          json.phone ?? "",
          json.image ?? "",
          json.dob ?? "dd-mm-yyyy",
          JSON.parse(json.status) ?? false,
          json.type ?? "user",
          json.attempt ?? 5,
          JSON.parse(json.isVerified) ?? false,
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
  }
  toMemberJson() {
    return {
      userId: this.userId,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      image: this.image,
      level: this.level,
      placementLevel: this.placementLevel,
      storage: this.storage.own,
      createdAt: this.createdAt,
    };
  }
}

export default AdminModel;

class DirectMember {
  constructor(
    _id,
    achiever,
    attempt,
    designation,
    dob,
    email,
    fullName,
    image,
    initial,
    isVerified,
    level,
    phone,
    placementId,
    placementLevel,
    rewardId,
    sponsorId,
    status,
    totalEarn,
    totalWithdraw,
    type,
    userId,
    wallet,
    createdAt,
    updatedAt
  ) {
    this._id = _id;
    this.achiever = achiever;
    this.attempt = attempt;
    this.designation = designation;
    this.dob = dob;
    this.email = email;
    this.fullName = fullName;
    this.image = image;
    this.initial = initial;
    this.isVerified = isVerified;
    this.level = level;
    this.phone = phone;
    this.placementId = placementId;
    this.placementLevel = placementLevel;
    this.rewardId = rewardId;
    this.sponsorId = sponsorId;
    this.status = status;
    this.totalEarn = totalEarn;
    this.totalWithdraw = totalWithdraw;
    this.type = type;
    this.userId = userId;
    this.wallet = wallet;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromArray(jsonData) {
    let data = [];
    for (let json of jsonData) {
      data.push(
        new DirectMember(
          json._id ?? null,
          json.achiever ?? 0,
          json.attempt ?? 0,
          json.designation ?? "",
          json.dob ?? "",
          json.email ?? "",
          json.fullName ?? "",
          json.image ?? "",
          json.initial ?? "",
          json.isVerified ?? false,
          json.level ?? 0,
          json.phone ?? "",
          json.placementId ?? "",
          json.placementLevel ?? 0,
          json.rewardId ?? [],
          json.sponsorId ?? "",
          json.status ?? false,
          json.totalEarn ?? 0,
          json.totalWithdraw ?? 0,
          json.type ?? "",
          json.userId ?? "",
          json.wallet ?? {},
          json.createdAt ?? new Date(),
          json.updatedAt ?? new Date()
        )
      );
    }
    return data;
  }
}

export default DirectMember;

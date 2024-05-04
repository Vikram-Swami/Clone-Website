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

  fromArray(jsonData) {
    return jsonData.map((e) => {
      return {
        _id: e._id ?? null,
        achiever: e.achiever ?? 0,
        attempt: e.attempt ?? 0,
        designation: e.designation ?? "",
        dob: e.dob ?? "",
        email: e.email ?? "",
        fullName: e.fullName ?? "",
        image: e.image ?? "",
        initial: e.initial ?? "",
        isVerified: e.isVerified ?? false,
        level: e.level ?? 0,
        phone: e.phone ?? "",
        placementId: e.placementId ?? "",
        placementLevel: e.placementLevel ?? 0,
        rewardId: e.rewardId ?? [],
        sponsorId: e.sponsorId ?? "",
        status: e.status ?? false,
        totalEarn: e.totalEarn ?? 0,
        totalWithdraw: e.totalWithdraw ?? 0,
        type: e.type ?? "",
        userId: e.userId ?? "",
        wallet: e.wallet ?? 0,
        createdAt: e.createdAt ?? new Date(),
        updatedAt: e.updatedAt ?? new Date(),
      };
    });
  }
}

export default DirectMember;

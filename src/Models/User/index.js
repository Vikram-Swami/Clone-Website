class UserModel {
  constructor(
    userId,
    fullName,
    email,
    phone,
    type,
    wallet,
    status,
    ownStr,
    memStr,
    usable,
    earning,
    createdAt,
    updatedAt,
    bankName,
    accountNo,
    IFSC,
    holder,
    aadhar,
    pan,
    nomineeName,
    sign,
    street1,
    street2,
    city,
    state,
    level,
    country,
    postalCode,
    rentCount,
    unread
  ) {
    this.id = userId;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.wallet = wallet;
    this.status = status;
    this.ownStr = ownStr;
    this.memStr = memStr;
    this.usable = usable;
    this.earning = earning;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.bankName = bankName;
    this.accountNo = accountNo;
    this.IFSC = IFSC;
    this.holder = holder;
    this.aadharNo = aadhar?.aadharNo ?? "";
    this.aadharFile = "data:" + aadhar?.mimeType + ";base64," + aadhar?.file ?? "";
    this.panNo = pan?.panNo ?? "";
    this.panFile = "data:" + pan?.mimeType + ";base64," + pan?.file ?? "";
    this.nomineeName = nomineeName;
    this.signFile = "data:" + sign?.mimeType + ";base64," + sign?.buffer ?? "";
    this.street1 = street1;
    this.street2 = street2;
    this.city = city;
    this.state = state;
    this.level = level;
    this.country = country;
    this.postalCode = postalCode;
    this.rentCount = rentCount;
    this.unread = unread;
  }

  toJson(jsonData) {
    return new UserModel(
      jsonData?.userId?.toUpperCase() ?? null,
      jsonData.fullName ?? "user",
      jsonData.email ?? "",
      jsonData.phone ?? "xxx-xxx-xxxx",
      jsonData.type ?? "",
      jsonData.wallet ?? null,
      jsonData.status ?? false,
      jsonData.storage?.own ?? null,
      jsonData.storage?.member ?? null,
      jsonData.storage?.usable ?? null,
      jsonData.totalEarn ?? null,
      jsonData.createdAt ?? new Date(),
      jsonData.updatedAt ?? new Date(),
      jsonData.bankName ?? "",
      jsonData.accountNo ?? "",
      jsonData.IFSC ?? "",
      jsonData.holder ?? "",
      {
        aadharNo: jsonData.aadhar?.aadharNo ?? "",
        mimeType: jsonData.aadhar?.mimeType ?? "",
        file: jsonData.aadhar?.file ?? "",
      },
      {
        panNo: jsonData.pan?.panNo ?? "",
        mimeType: jsonData.pan?.mimeType ?? "",
        file: jsonData.pan?.file ?? "",
      },
      jsonData.nomineeName ?? "",
      {
        mimetype: jsonData.sign?.mimeType ?? "",
        buffer: jsonData.sign?.file ?? "",
      },
      jsonData.street1 ?? "",
      jsonData.street2 ?? "",
      jsonData.city ?? "",
      jsonData.state ?? "",
      jsonData.level ?? 0,
      jsonData.country ?? "",
      jsonData.postalCode ?? "",
      jsonData.rentCount ?? 0,
      jsonData.unread ?? 0
    );
  }
  memberToArray(json) {
    return json.map((e) => {
      return {
        userId: e?.userId ?? "",
        name: e?.fullName ?? "",
        email: e?.email ?? "",
        phone: e?.phone ?? "xxx-xxx-xxxx",
        status: e.status,
        isVerified: e.isVerified,
        image: e.image ?? {},
        level: e?.level,
        placementLevel: e.placementLevel,
        storage: e.storage,
        createdAt: new Date(e.createdAt),
        updatedAt: e.updatedAt,
      };
    });
  }
}

export default UserModel;

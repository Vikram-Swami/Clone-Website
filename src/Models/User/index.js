class UserModel {
  constructor(
    userId,
    initial,
    fullName,
    email,
    phone,
    type,
    wallet,
    totalWithdraw,
    status,
    isVerified,
    ownStr,
    memStr,
    usable,
    earning,
    mIncome,
    createdAt,
    updatedAt,
    tds,
    bankName,
    accountNo,
    IFSC,
    holder,
    aadhar,
    pan,
    image,
    nomineeName,
    sign,
    street,
    city,
    state,
    level,
    leader,
    avail,
    country,
    postalCode,
    unread
  ) {
    this.id = userId;
    this.initial = initial;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.wallet = wallet;
    this.totalWithdraw = totalWithdraw;
    this.status = status;
    this.isVerified = isVerified;
    this.ownStr = ownStr;
    this.memStr = memStr;
    this.usable = usable;
    this.earning = earning;
    this.mIncome = mIncome;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tds = tds;
    this.bankName = bankName;
    this.accountNo = accountNo;
    this.IFSC = IFSC;
    this.holder = holder;
    this.aadharNo = aadhar?.aadharNo ?? "";
    this.aadharFile = "data:" + aadhar?.mimeType + ";base64," + aadhar?.buffer ?? "";
    this.panNo = pan?.panNo ?? "";
    this.panFile = "data:" + pan?.mimeType + ";base64," + pan?.buffer ?? "";
    this.image = image?.buffer ? "data:" + image?.mimeType + ";base64," + image?.buffer ?? "" : null;
    this.nomineeName = nomineeName;
    this.signFile = "data:" + sign?.mimeType + ";base64," + sign?.buffer ?? "";
    this.street = street;
    this.city = city;
    this.state = state;
    this.level = level;
    this.leader = leader;
    this.avail = avail;
    this.country = country;
    this.postalCode = postalCode;
    this.unread = unread;
  }

  toJson(jsonData) {

    const date = new Date(jsonData?.user?.createdAt);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });


    return new UserModel(
      jsonData?.user.userId?.toUpperCase() ?? null,
      jsonData?.user?.initial ?? "",
      jsonData?.user?.fullName ?? "user",
      jsonData?.user?.email ?? "",
      jsonData?.user?.phone ?? "xxx-xxx-xxxx",
      jsonData?.user?.type ?? "",
      jsonData?.user?.wallet ?? null,
      jsonData?.user?.totalWithdraw,
      jsonData?.user?.status ?? false,
      jsonData?.user.isVerified ?? false,
      jsonData?.user?.storage?.own ?? null,
      jsonData?.user?.storage?.member ?? null,
      jsonData?.user?.storage?.usable ?? null,
      jsonData?.user?.totalEarn ?? null,
      jsonData?.mIncome ?? 0,
      formattedDate ?? new Date(),
      jsonData?.user?.updatedAt ?? new Date(),
      jsonData?.tds ?? 0,
      jsonData?.kyc?.bankName ?? "",
      jsonData?.kyc?.accountNo ?? "",
      jsonData?.kyc?.IFSC ?? "",
      jsonData?.kyc?.holder ?? "",
      {
        aadharNo: jsonData?.kyc?.aadharNo ?? "",
        mimeType: jsonData?.kyc?.aadhar?.mimeType ?? "",
        file: jsonData?.kyc?.aadhar?.file ?? "",
      },
      {
        panNo: jsonData?.kyc?.panNo ?? "",
        mimeType: jsonData?.kyc?.pan?.mimeType ?? "",
        file: jsonData?.kyc?.pan?.file ?? "",
      },
      {
        mimeType: jsonData?.user?.image?.mimeType ?? "",
        buffer: jsonData?.user?.image?.file ?? "",
      },
      jsonData?.kyc?.nomineeName ?? "",
      {
        mimeType: jsonData?.kyc?.sign?.mimeType ?? "",
        buffer: jsonData?.kyc?.sign?.file ?? "",
      },
      jsonData?.address?.street ?? "",
      jsonData?.address?.city ?? "",
      jsonData?.address?.state ?? "",
      jsonData?.user?.level ?? 0,
      jsonData?.user?.leader ?? false,
      jsonData?.avail ?? 0,
      jsonData?.address?.country ?? "",
      jsonData?.address?.postalCode ?? "",
      jsonData?.unread ?? 0
    );
  }

  memberToArray(json) {

    return json.map((e) => {

      const dateObject = new Date(e.createdAt);
      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);



      return {
        userId: e?.userId ?? "",
        id: e.id ?? "",
        initial: e?.initial ?? "",
        name: e?.fullName ?? "",
        email: e?.email ?? "",
        phone: e?.phone ?? "xxx-xxx-xxxx",
        status: e.status,
        isVerified: e.isVerified,
        image: e.image ?? {},
        sponsorId: e.sponsorId,
        placementId: e.placementId,
        level: e?.level,
        placementLevel: e.placementLevel,
        storage: e.storage,
        member: e.member,
        createdAt: formattedDate,
        updatedAt: e.updatedAt,
      };
    });
  }
}

export default UserModel;

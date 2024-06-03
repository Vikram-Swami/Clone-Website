import { Typography } from "@mui/material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

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
    this.initial = initial;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.wallet = wallet;
    this.totalWithdraw = totalWithdraw;
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
      jsonData?.user.userId?.toUpperCase() ?? null,
      jsonData.user.initial ?? "",
      jsonData.user.fullName ?? "user",
      jsonData.user.email ?? "",
      jsonData.user.phone ?? "xxx-xxx-xxxx",
      jsonData.user.type ?? "",
      jsonData.user.wallet ?? null,
      jsonData.user.totalWithdraw,
      jsonData.user.status ?? false,
      jsonData.user.storage?.own ?? null,
      jsonData.user.storage?.member ?? null,
      jsonData.user.storage?.usable ?? null,
      jsonData.user.totalEarn ?? null,
      jsonData.user.createdAt ?? new Date(),
      jsonData.user.updatedAt ?? new Date(),
      jsonData.kyc.bankName ?? "",
      jsonData.kyc.accountNo ?? "",
      jsonData.kyc.IFSC ?? "",
      jsonData.kyc.holder ?? "",
      {
        aadharNo: jsonData.kyc?.aadharNo ?? "",
        mimeType: jsonData.kyc.aadhar?.mimeType ?? "",
        file: jsonData.kyc.aadhar?.file ?? "",
      },
      {
        panNo: jsonData.kyc?.panNo ?? "",
        mimeType: jsonData.kyc.pan?.mimeType ?? "",
        file: jsonData.kyc.pan?.file ?? "",
      },
      jsonData.kyc.nomineeName ?? "",
      {
        mimetype: jsonData.kyc.sign?.mimeType ?? "",
        buffer: jsonData.kyc.sign?.file ?? "",
      },
      jsonData.address.street1 ?? "",
      jsonData.address.street2 ?? "",
      jsonData.address.city ?? "",
      jsonData.address.state ?? "",
      jsonData.user.level ?? 0,
      jsonData.address.country ?? "",
      jsonData.address.postalCode ?? "",
      jsonData.user.rentCount ?? 0,
      jsonData.unread ?? 0
    );
  }

  createLabel({ initial, userId, fullName, email, phone, isVerified, storage, createdAt, status }) {
    return (<><Typography>{userId}</Typography><Typography>{fullName}</Typography></>)
  }

  memberToArray(json) {
    let p = 0;

    return json.map((e, i) => {
      if (parseInt(json[i - 1]?.level) < parseInt(e.level)) {
        p = 0;
      }
      else if (e.level == 0) {
        p = parseInt(json.filter(e => e.level == 1).length / 2)
      }
      else {
        p += 1;
      }
      const dateObject = new Date(e.createdAt);
      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);



      return {
        userId: e?.userId ?? "",
        id: e.id ?? "",
        data: { label: this.createLabel(e) },
        position: { x: p * 200, y: parseInt(e.level) * 200 },
        initial: e?.initial ?? "",
        name: e?.fullName ?? "",
        email: e?.email ?? "",
        phone: e?.phone ?? "xxx-xxx-xxxx",
        status: e.status,
        isVerified: e.isVerified,
        image: e.image ?? {},
        level: e?.level,
        placementLevel: e.placementLevel,
        storage: e.storage,
        type: 'output',
        createdAt: formattedDate,
        updatedAt: e.updatedAt,
      };
    });
  }
}

export default UserModel;

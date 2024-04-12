class Transaction {
    constructor(id,
        amount,
        type,
        userId,
        tnxId,
        invoiceNo,
        status,
        paymentMethod,
        createdAt,
        updatedAt) {

            this.id = id;
            this.amount = amount;
            this.type = type;
            this.userId = userId;
            this.tnxId = tnxId;
            this.invoiceNo = invoiceNo;
            this.status = status;
            this.paymentMethod = paymentMethod;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }
  
    fromArray(jsonData) {
      let data = [];
      for (let json of jsonData) {
        data.push(
          new Transaction(
            json._id ?? null,
            json.amount,
            json.type,
            json.userId,
            json.tnxId,
            json.invoiceNo,
            json.status,
            json.paymentMethod,
            json.createdAt,
            json.updatedAt 
          )
        );
      }
      return data;
    }
  }
  
  export default Transaction;
  
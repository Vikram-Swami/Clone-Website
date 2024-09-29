class Products {
    constructor(
        id,
        range,
        space,
        rent,
        basicAmt,
        tax,
        type,
        rule,
        createdAt,
        updatedAt
    ) {
        this.id = id;
        this.range = range;
        this.space = space;
        this.rent = rent;
        this.basicAmt = basicAmt;
        this.tax = tax;
        this.type = type;
        this.rule = rule;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    fromArray(jsonData) {
        let data = jsonData.map(e =>
            new Products(
                e._id ?? null,
                parseFloat(e.range) ?? 0,
                parseInt(e.space) ?? 0,
                parseFloat(e.rent) ?? 1.0,
                parseInt(e.basicAmt) ?? 0,
                parseFloat(e.tax) ?? 18.0,
                e.type ?? "published",
                parseInt(e.rule) ?? 7,
                e.createdAt ?? new Date(),
                e.updatedAt ?? new Date()
            )
        );
        return data;
    }


}
export default Products;
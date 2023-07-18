const productModel = require("../../schemas/product.schema");

module.exports = {
  listItems: async (params, option) => {
    let queryParams = { ...params };

    // delete fields not belong to find
    let removeFields = ["page", "limit"];

    removeFields.forEach((field) => delete queryParams[field]);

    // add comparison query operator symbols
    queryParams = JSON.stringify(queryParams).replace(
      /\b(in|nin|eq|neq|lt|lte|gt|gte)\b/g,
      (find) => `$${find}`
    );

    queryParams = JSON.parse(queryParams);

    // pagination
    let page = parseInt(params.page) || 1;
    let limit = parseInt(params.limit) || 3;
    let skip = (page - 1) * limit;

    if (option.task === "all") {
      const dataCall = await productModel
        .find({ statusBoolean: true })
        .skip(skip)
        .limit(limit);

      const dataInfo = await productModel.find({});
      let pageCount = Math.ceil(dataInfo.length / limit);
      return {
        dataCall,
        pageCount,
      };
    }
  },
};

const categoryModel = require("../../schemas/category.schema");
const productModel = require("../../schemas/product.schema");
const cloudinary = require("cloudinary").v2;

module.exports = {
  create: (item) => {
    return categoryModel(item).save();
  },
  listItems: (params, option) => {
    if (option.task === "all") {
      return categoryModel.find(params);
    }
  },
  deleteItem: async (params, option) => {
    if (option.task === "single") {
      const record = await categoryModel.findById({ _id: params.id });
      const { thumbUrl } = record;
      const urlArray = thumbUrl.split("/");
      const image = urlArray[urlArray.length - 1];
      const imageName = image.split(".")[0];

      return cloudinary.uploader
        .destroy(`shopbee/categories/${imageName}`)
        .then(async () => {
          // delete category
          return await categoryModel
            .deleteOne({ _id: params.id })
            .then(async () => {
              // then delete all products of this category
              return await productModel
                .deleteMany({ category: record.name })
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              return error;
            });
        })
        .catch((error) => {
          return error;
        });
    }

    if (option.task === "many") {
      const records = await categoryModel.find({ _id: { $in: params.id } });

      // lấy ra danh sách các image path cloudinary
      let thumbUrlArray = [];
      records.forEach((record) => {
        thumbUrlArray.push(record.thumbUrl);
      });

      // format lại array để tạo api xóa image tại cloudinary
      thumbUrlArray = thumbUrlArray.map((thumbUrl) => {
        const prefix = `shopbee/categories/`;
        const urlArray = thumbUrl.split("/");
        const image = urlArray[urlArray.length - 1];
        const imageName = image.split(".")[0];
        return prefix + imageName;
      });

      return cloudinary.api
        .delete_resources(thumbUrlArray)
        .then(async () => {
          try {
            // delete many categories
            return await categoryModel
              .deleteMany({ _id: params.id })
              .then((result) => {
                records.forEach(async (record) => {
                  await productModel.deleteMany({ category: record.name });
                });
                return result;
              });
          } catch (error) {
            return error;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  editCategory: async (params) => {
    const { id, dataForm, thumbUrl } = params;
    if (thumbUrl === null) {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        dataForm,
        {
          new: true,
        }
      );

      return updatedCategory;
    } else {
      /*
        delete old image,then insert new image 
       */

      // get category by id
      const categoryById = await categoryModel.findById(id);

      // delete old image
      const prefix = "shopbee/categories/";
      let oldThumbUrl = categoryById.thumbUrl;
      oldThumbUrl = oldThumbUrl.split("/");
      oldThumbUrl = oldThumbUrl[oldThumbUrl.length - 1];
      oldThumbUrl = oldThumbUrl.split(".")[0];

      const actDeleteOldImage = await cloudinary.uploader
        .destroy(prefix + oldThumbUrl)
        .then(async () => {
          const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
              ...dataForm,
              thumbUrl: thumbUrl.path,
            },
            {
              new: true,
            }
          );
          return updatedCategory;
        })
        .catch((error) => {
          return error;
        });

      return actDeleteOldImage;
    }
  },
};

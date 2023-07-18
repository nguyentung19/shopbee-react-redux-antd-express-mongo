const productModel = require("../../schemas/product.schema");
const cloudinary = require("cloudinary").v2;

module.exports = {
  create: (item) => {
    return productModel(item).save();
  },

  listItems: (params, option) => {
    if (option.task === "all") {
      return productModel.find(params);
    }
    if (option.task === "single") {
      return productModel.findById({ _id: params.id });
    }
  },
  deleteItems: async (params, option) => {
    if (option.task === "single") {
      const record = await productModel.findById({ _id: params.id });

      return cloudinary.uploader
        .destroy(record.image.filename)
        .then(async () => {
          return await productModel
            .deleteOne({ _id: params.id })
            .then((result) => {
              return result;
            });
        })
        .catch((error) => {
          return error;
        });
    } else if (option.task === "many") {
      // lấy ra danh sách trong database tương ứng với id được truyền vào
      const data = await productModel.find({
        _id: {
          $in: params.id,
        },
      });

      // lọc ra các filename cho việc xóa tại cloudinary
      const deletedImageArray = data.map((item) => {
        return item.image.filename;
      });

      // delete all image on cloudinary
      return cloudinary.api
        .delete_resources(deletedImageArray)
        .then(async () => {
          const result = await productModel.deleteMany({ _id: params.id });
          return result;
        })
        .catch((error) => {
          return error;
        });
    }
  },
  editItem: async (params) => {
    const { id, dataForm, image } = params;
    if (image === null) {
      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        dataForm,
        {
          new: true,
        }
      );

      return updatedProduct;
    } else {
      /*
        delete old image,then insert new image 
       */

      // get category by id
      const productById = await productModel.findById(id);

      // delete old image
      return cloudinary.uploader
        .destroy(productById.image.filename)
        .then(async () => {
          const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
              ...dataForm,
              image: image,
            },
            {
              new: true,
            }
          );

          return updatedProduct;
        })
        .catch((error) => {
          return error;
        });
    }
  },
};

import { api } from "..";

const productApi = {
  getList: () => {
    return api.call().get("/product");
  },
  addNewProduct: (newProduct) => {
    const { name, category, image, statusBoolean, price } = newProduct;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("statusBoolean", statusBoolean);
    formData.append("image", image[0].originFileObj);
    formData.append("category", category);
    formData.append("price", price);

    return api.call().post("/product/add", formData);
  },
  deleteProduct: (id) => {
    return api.call().delete(`/product/${id}`);
  },
  editProduct: (data) => {
    const { key, name, statusBoolean, image, price, category } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("statusBoolean", statusBoolean);
    formData.append("image", image.uid ? image : JSON.stringify(image));
    formData.append("category", category);
    formData.append("price", price);

    return api.call().put(`/product/edit/${key}`, formData);
  },
};

export default productApi;

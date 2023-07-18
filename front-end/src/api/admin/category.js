import { api } from "..";

const categoryApi = {
  getList: () => {
    return api.call().get("/category");
  },
  addNewCategory: (data) => {
    const { name, statusBoolean, thumbUrl } = data;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("statusBoolean", statusBoolean);
    formData.append("thumbUrl", thumbUrl[0].originFileObj);

    return api.call().post("/category/add", formData);
  },
  deleteSingleCategory: (id) => {
    return api.call().delete(`/category/delete/${id}`, {
      params: { id },
    });
  },
  editCategory: (data) => {
    const { _id, name, statusBoolean, thumbUrl } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("statusBoolean", statusBoolean);
    formData.append("thumbUrl", thumbUrl);

    return api.call().put(`/category/edit/${_id}`, formData);
  },
};

export default categoryApi;

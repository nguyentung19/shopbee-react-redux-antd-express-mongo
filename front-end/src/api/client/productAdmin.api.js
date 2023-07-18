import { api } from "..";

const productClient = {
  getList: ({ limit, page } = {}) => {
    return api.callClient().get("/products", {
      params: {
        limit,
        page
      },
    });
  },
};

export default productClient;

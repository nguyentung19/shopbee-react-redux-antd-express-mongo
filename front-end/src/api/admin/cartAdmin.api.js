import { api } from "..";

const cartAdminApi = {
  getCartList: () => {
    return api.call().get("/cart");
  },
  updateStatus: (id, status) => {
    return api.call().put(`/cart/edit/${id}`, {
      status,
    });
  },
  addCart: (userId, cart) => {
    return api.call().post("/cart/add", {
      userId,
      cart,
    });
  },
  deleteCart: (id) => {
    return api.call().delete(`/cart/delete/${id}`);
  },
  getClientOrders: (clientId) => {
    return api.call().get(`cart/clientOrders/${clientId}`);
  },
};

export default cartAdminApi;

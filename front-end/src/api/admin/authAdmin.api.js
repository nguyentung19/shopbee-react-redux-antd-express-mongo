import { api } from "..";

const authAdminApi = {
  login: ({ email, password }) => {
    return api.call().post("/auth/login", {
      email,
      password,
    });
  },
  getUserWithToken: (token) => {
    return api.call().get("/auth/me", {
      headers: {
        authorization : `Bearer ${token}`,
      },
    });
  },
};

export default authAdminApi;

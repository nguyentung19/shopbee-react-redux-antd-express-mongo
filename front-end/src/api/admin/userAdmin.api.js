import { api } from "..";

const userAdminApi = {
  register: (data) => {
    const { username, email, password, phone, address, role } = data;

    return api.call().post("/user/register", {
      role,
      username,
      email,
      password,
      phone,
      address,
    });
  },
  getUsers: () => {
    return api.call().get("/user");
  },
  deleteUser: (id) => {
    return api.call().delete(`/user/delete/${id}`);
  },
  editUser: (user) => {
    return api.call().put(`/user/edit/${user.id}`, user);
  },
};

export default userAdminApi;

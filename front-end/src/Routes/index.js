import AdminPage from "../Pages/AdminPage/";
import Category from "../Pages/AdminPage/Category";
import HomePage from "../Pages/HomePage/index.jsx";
import Products from "../Pages/AdminPage/Product/index.jsx";
import HomePageContent from "../Components/HomePage/HomePageContent/index.jsx";
import Register from "../Pages/HomePage/Register/index.jsx";
import Login from "../Pages/HomePage/Login/index.jsx";
import User from "../Pages/HomePage/User/index.jsx";
import UserAdmin from "../Pages/AdminPage/User/index.jsx";
import CartPage from "../Pages/HomePage/Cart";
import CartAdminPage from "../Pages/AdminPage/Cart";
import CartCheck from "../Pages/HomePage/CartCheck";
import ProductLike from "../Pages/HomePage/ProductLike";
import NotFound from "../Pages/NotFound";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <HomePageContent />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "cartCheck",
        element: <CartCheck />,
      },
      {
        path: "productLike",
        element: <ProductLike />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      // {
      //   index: true,
      //   element: <AdminContent />,
      // },
      {
        // path: "category",
        index: true,
        element: <Category />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users",
        element: <UserAdmin />,
      },
      {
        path: "cartAdminPage",
        element: <CartAdminPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;

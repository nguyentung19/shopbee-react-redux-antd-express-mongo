import React, { useEffect } from "react";
import "./HomePageContent.scss";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllCategoriesAsync } from "../../../store/admin/category/action";
import HomeCategory from "./HomeCategory";
import { actFetchAllProductsClientAsync } from "../../../store/client/productClient/action.productClient";
import HomeProduct from "./HomeProduct";

export default function HomePageContent() {
  const dispatch = useDispatch();

  const { page, limit } = useSelector((state) => state.ProductClient);

  const categories = useSelector((state) =>
    state.Category.categories.filter(
      (category) => category.statusBoolean === true
    )
  );

  useEffect(() => {
    dispatch(actFetchAllCategoriesAsync());

    // Get Client Product
    if (page < 1) {
      dispatch(actFetchAllProductsClientAsync({ page : 1 , limit }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="home-container">
      <div className="container">
        {/* Home category */}
        <HomeCategory categories={categories} />

        {/* Home Products */}
        <HomeProduct />
      </div>
    </section>
  );
}

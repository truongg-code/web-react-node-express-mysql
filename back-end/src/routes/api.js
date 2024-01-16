import express from "express";
import itemNavController from "../controller/navbar/itemNavController";
import ProductController from "../controller/products/ProductController";
import productDetailController from "../controller/products/productDetailController";
import FilterController from "../controller/products/FilterController";
import SearchProductController from "../controller/products/SearchProductController";

const router = express.Router();

const initApiRoutes = (app) => {
  //api nav
  router.get("/navigation", itemNavController.getItemNav);
  router.get("/child-item-navigation", itemNavController.getChildItemNav);

  //api shop-all product
  router.get("/collections/shop-all", ProductController.getShopAllProduct);

  //arrange shop-all product a-z
  router.get(
    "/collections/shop-all/sort_by=asc",
    ProductController.arrangeShopAllProductsAtoZ
  );
  //arrange shop-all product z-a
  router.get(
    "/collections/shop-all/sort_by=desc",
    ProductController.arrangeShopAllProductsZtoA
  );

  //api wedding product
  router.get("/collections/wedding", ProductController.getWeddingProduct);

  //arrange wedding product a-z
  router.get(
    "/collections/wedding/sort_by=asc",
    ProductController.arrangeWeddingProductsAtoZ
  );
  //arrange wedding product z-a
  router.get(
    "/collections/wedding/sort_by=desc",
    ProductController.arrangeWeddingProductsZtoA
  );

  //filter
  router.get(
    "/collections/shop-all/filter=price",
    FilterController.filterProductByPrice
  );

  //product detail in shop all
  router.get(
    "/collections/shop-all/products/:slug",
    productDetailController.getProductDetail
  );

  //product search input
  router.get(
    "/collections/shop-all/search",
    SearchProductController.getProductsSearch
  );

  return app.use("/api", router);
};

export default initApiRoutes;

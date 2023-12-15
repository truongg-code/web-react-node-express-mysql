import express from "express";
import itemNavController from "../controller/itemNavController";
import ProductController from "../controller/ProductController";
import productDetailController from "../controller/productDetailController";
import FilterController from "../controller/FilterController";

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
    "/collections/shop-all/filter",
    FilterController.filterProductByPrice
  );

  //product detail in shop all
  router.get(
    "/collections/shop-all/products/:slug",
    productDetailController.getProductDetail
  );

  return app.use("/api", router);
};

export default initApiRoutes;

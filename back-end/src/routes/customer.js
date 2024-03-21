import express from "express";
import CustomerController from "../controller/customers/CustomerController";

const router = express.Router();

const customersApiRoutes = (app) => {
  router.post("/create", CustomerController.createOrder);
  router.get("/check-banking", CustomerController.checkBankingCustomer);
  router.get(
    "/check-duplicated",
    CustomerController.getCountOrderCodeDuplicated
  );

  return app.use("/customer", router);
};

export default customersApiRoutes;

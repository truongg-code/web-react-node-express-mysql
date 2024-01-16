import express from "express";
import CustomerController from "../controller/customers/CustomerController";

const router = express.Router();

const customersApiRoutes = (app) => {
  router.post("/create", CustomerController.createCustomer);
  router.delete("/delete", CustomerController.deleteCustomer);

  return app.use("/customer", router);
};

export default customersApiRoutes;

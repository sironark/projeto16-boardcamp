import { Router } from "express";
import { getCustomers, getCustomersById, postCustomers, putCustomerById } from "../controllers/customers.controller.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { postCustomersSchema } from "../schemas/app.schemas.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", validateSchema(postCustomersSchema), postCustomers);
customersRouter.put("/customers/:id", validateSchema(postCustomersSchema), putCustomerById);


export default customersRouter;
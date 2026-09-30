import { Router } from "express";
import Basic_CRUDRouter from "./Basic_CRUD/index.js";
import Advanced_CRUDRouter from "./Advanced_CRUD/index.js";
import listEndpoints from "express-list-endpoints";

function listEndpointsWithPrefix(prefix, router) {
  return listEndpoints(router).map((endpoint) => ({
    ...endpoint,
    path: `${prefix}${endpoint.path}`,
  }));
}

const rootRouter = Router();

rootRouter.use("/basic", Basic_CRUDRouter);
rootRouter.use("/advanced", Advanced_CRUDRouter);

const endpoints = [
  ...listEndpointsWithPrefix("/basic", Basic_CRUDRouter),
  ...listEndpointsWithPrefix("/advanced", Advanced_CRUDRouter),
];

console.log(endpoints);
export default rootRouter;

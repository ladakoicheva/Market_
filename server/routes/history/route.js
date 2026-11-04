import { Router } from "express";
import { addToHistory } from "./controller.js";
import { getAllHistory } from "./controller.js";
import { authorize } from "../../middlewares/auth.js";

export const historyRouter = Router();

historyRouter.post('/add',authorize, addToHistory)
historyRouter.get('/get',authorize, getAllHistory)







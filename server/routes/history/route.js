import { Router } from "express";
import { addToHistory } from "./controller.js";
import { getAllHistory } from "./controller.js";
import { authorize } from "../../middlewares/auth.js";
import { getHistoryItem } from "./controller.js";


export const historyRouter = Router();

historyRouter.post('/',authorize, addToHistory)
historyRouter.get('/', authorize, getAllHistory)
historyRouter.get('/:id', authorize, getHistoryItem)




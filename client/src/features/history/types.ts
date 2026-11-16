import type { productI } from "../product/types";

export interface historyI {
  date: number;
  owner: string;
  products: Partial<productI[]>;
}

export type newHistoryI = Omit<historyI, "date">;

import type { productI } from "../features/product/types";

export type typeReq = 'POST' | 'GET' | 'DELETE' | 'PATCH';
export type typeResponseGood<A> = { ok: true, data: A };
export type typeResponseBad = { ok: false, e?: string };
export type typeResponseAPI<T> = typeResponseGood<T> | typeResponseBad;
export type searchResult<T = productI> = { products: T[], index: number, isNext: boolean };
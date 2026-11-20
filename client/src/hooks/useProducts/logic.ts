
import type {  stateI } from "./types";
import { ActionTypes } from "./types";

export const reducer = <T>(
  state: stateI<T>, 
  action: { type: ActionTypes, payload: any}
): stateI<T> => {
  switch (action.type) {
    case ActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          productsData: state.data.productsData.filter((p)=>p.id !== action.payload),
          currentPage: state.data.currentPage + 1
        },
      }

    }
    case ActionTypes.GET_PRODUCTS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          productsData: [...state.data.productsData, ...action.payload.products],
          currentPage: state.data.currentPage + 1
        },

      }
    case ActionTypes.GET_SEARCH:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.payload,
          productsData: action.payload.products,

        },

      }
    case ActionTypes.GET_NEXT_SEARCH:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.payload,
          productsData: [...state.searchData.productsData, ...action.payload.products],
        },
      }

    default:
      throw Error('Unknown action.');
  }
};



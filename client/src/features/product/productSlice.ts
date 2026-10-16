import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { stateI } from "./types";
import { addProduct } from "../../api/products";
import type { AppDispatch } from "../../redux/store";
import type { productI } from "./types";
import { getUserProducts } from "../../api/products";
import { getCategories } from "../../api/products";
import { editProduct } from "../../api/products";
import type { category } from "./types";
import type { RootState } from "../../redux/store";

const initialState:stateI = {
  editProduct: {
    isEdit: false, product: {
      name: "",
      category:undefined,
      price: 0,
      inStock: false,
      owner: '',
      id:''
    }
  },
  products: [],
  categories:[],

}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateAddProduct: (state,action) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
    },
    updateShowUserProducts: (state, action) => {
      state.products = action.payload
    },
    updateProductNoUser: (state) => {
      state.products = []
    },
    updateCategories: (state, action) => {
      state.categories = action.payload
    },
    updateEditProduct: (state, action) => {
      state.editProduct.isEdit = true;
      state.editProduct.product = action.payload;
    },
    
     updateProductInList: (state,action) => {
       state.editProduct.isEdit = false;
       const index = state.products.findIndex((p) => p.id === action.payload.id);
       if (index !== -1) {
      state.products[index] = action.payload; // Заменяем старый продукт новым
      }
      state.editProduct.product = {
      name: "",
      category:undefined,
      price: 0,
      inStock: false,
      owner: '',
      id:''
    };
    },
  }
})

export const getUserProductData = createAsyncThunk
  <{ ok: Boolean },
    void,
  { dispatch: AppDispatch }
>(
    'products/add',
    
  async (_,{dispatch}) => {
    const res = await getUserProducts()
    if (!res.ok) return { ok: false, e: res.e };
     dispatch(updateShowUserProducts(res.data));
    return {ok:true}
  },

)


export const addProductData = createAsyncThunk<
  { ok: boolean, data: productI }, 
  Omit<productI, "owner" | "id">,
  { dispatch: AppDispatch }
>(
  'products/add',
  async (newProduct, { dispatch, rejectWithValue }) => {
    const res = await addProduct(newProduct);
    
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
    
    dispatch(updateAddProduct(res.data));
    return { ok: true, data: res.data };
  }
);


export const editProductData = createAsyncThunk<
  { ok: boolean, data: productI }, 
  productI,
  { dispatch: AppDispatch ,state: RootState; rejectValue: { ok: boolean; e: any }}
>(
  'products/edit',
  async (newProduct, { dispatch, rejectWithValue, getState }) => {
    const state = getState()
    const res = await editProduct({ ...newProduct, oldCategory: state.productData.editProduct.product.category} );
    
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
    
    dispatch(updateProductInList(res.data));
    return { ok: true, data: res.data as productI };
  }
);

export const getCategoriesData = createAsyncThunk<
  { ok: boolean, data: category[] }, 
  void,
  { dispatch: AppDispatch,rejectValue:  { ok: boolean, e:any}}
>(
  'products/getCategories',
  async (_, { dispatch, rejectWithValue }) => {
    const res = await getCategories()
    
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
    
    dispatch(updateCategories(res.data as category[]));
    return { ok: true, data: res.data as category[]};
  }
);


export default productSlice.reducer;
export const {updateAddProduct,updateProductNoUser,updateShowUserProducts,updateCategories, updateEditProduct,updateProductInList} = productSlice.actions
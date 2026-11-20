import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { stateI } from "./types";
import { createProductOne } from "../../api/products";
import type { AppDispatch } from "../../redux/store";
import type { productI } from "./types";
import { getUserProducts } from "../../api/users";
import { getCategories } from "../../api/products";
import { editProductOne } from "../../api/products";
import type { category } from "./types";
import type { RootState } from "../../redux/store";
import type { productFormValues } from "../../components/ProductForm/types";
import { deleteProductOne } from "../../api/products";

interface ProductThunkError  { ok: false; e?: string };

const initialState:stateI = {
  editProduct: {
    isEdit: false, product: {
      name: "",
      category:"",
      price: 0,
      inStock: false,
      owner: '',
      id: 0
    }
  },
  products: [],
  categories:[],

}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateCreateProductOne: (state,action:PayloadAction<productI>) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
    },
    updateGetUserProducts: (state, action:PayloadAction<productI[]>) => {
      state.products = action.payload
    },
    resetUserProducts: (state) => {
      state.products = []
    },
    updateGetCategories: (state, action: PayloadAction<category[]>) => {
      state.categories = action.payload
    },
    updateEditProduct: (state, action:PayloadAction<productI>) => {
      state.editProduct.isEdit = true;
      state.editProduct.product = action.payload;
    },
    updateDeleteProductOne: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    
     updateEditProductOne: (state,action:PayloadAction<productI>) => {
       state.editProduct.isEdit = false;
       const index = state.products.findIndex((p) => p.id === action.payload.id);
      
      state.products[index] = action.payload; 
     
      state.editProduct.product = {
      name: "",
      category:"",
      price: 0,
      inStock: false,
      owner: '',
      id: 0
    };
    },
  }

})

export const getUserProductsData = createAsyncThunk
  <{ ok: true; data: productI[] },
    void,
  { dispatch: AppDispatch; rejectValue: ProductThunkError }
>(
    'products/add',
    
  async (_,{dispatch, rejectWithValue}) => {
    const res = await getUserProducts()
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
     dispatch(updateGetUserProducts(res.data));
    return { ok: true, data: res.data };
  },

)


export const createProductOneData = createAsyncThunk<
  { ok: true, data: productI }, 
  productFormValues,
  { dispatch: AppDispatch; rejectValue: ProductThunkError }
>(
  'products/add',
  async (newProduct, { dispatch, rejectWithValue }) => {
    const res = await createProductOne(newProduct);
    
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
    console.log(res.data)
    dispatch(updateCreateProductOne(res.data));
    return { ok: true, data: res.data };
  }
);


export const deleteProductOneData = createAsyncThunk<
  { ok: true },
  number,
  { dispatch: AppDispatch; rejectValue: ProductThunkError }
>(
  'products/add',
  async (id, { dispatch, rejectWithValue }) => {
    const res = await deleteProductOne(id);

    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }

    dispatch(updateDeleteProductOne(id));
    return { ok: true};
  }
);


export const editProductOneData = createAsyncThunk<
  { ok: true, data: productI }, 
  productI,
  { dispatch: AppDispatch; state: RootState; rejectValue: ProductThunkError }
>(
  'products/edit',
  async (newProduct, { dispatch, rejectWithValue, getState }) => {
    
    const res = await editProductOne(newProduct );
    
    console.log(newProduct);
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
    
    dispatch(updateEditProductOne(newProduct));
    return { ok: true, data: res.data };
  }
);

export const getCategoriesData = createAsyncThunk<
  { ok: true, data: category[] }, 
  void,
  { dispatch: AppDispatch; rejectValue: ProductThunkError }
>(
  'products/getCategories',
  async (_, { dispatch, rejectWithValue }) => {
    const res = await getCategories();
    
    
    if (!res.ok) {
      return rejectWithValue({ ok: false, e: res.e });
    }
    
    dispatch(updateGetCategories(res.data));
    return { ok: true, data: res.data};
  }
);


export default productSlice.reducer;
export const {
  updateCreateProductOne,
  resetUserProducts,
  updateGetUserProducts,
  updateGetCategories,
  updateEditProduct,
  updateEditProductOne,
  updateDeleteProductOne
} = productSlice.actions
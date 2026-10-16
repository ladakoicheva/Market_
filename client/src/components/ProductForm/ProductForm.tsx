import { Formik, Form, Field, ErrorMessage } from "formik";
import style from './ProductForm.module.css'
import Button from "../Button/Button";
import { useState } from "react";
import Switches from "../Switch";
import { CategoriesE } from "../../features/product/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addProductData } from "../../features/product/productSlice";
import { editProductData } from "../../features/product/productSlice";

import { useNavigate } from "react-router";

interface FormValues  {
  name: string,
  category:  CategoriesE| undefined,
  price: number,
  inStock:boolean,
};

type props = {
  closeForm?:()=>void
}

export default function ProductForm({closeForm}:props) {
  const { categories ,editProduct} = useAppSelector((s) => s.productData);
  const [backError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


 
  const initialValues: FormValues= editProduct.isEdit ?
    {
      name: editProduct.product.name,
      category: editProduct.product.category,
      price: editProduct.product.price,
      inStock:editProduct.product.inStock
     } : {
  name: "",
  category: undefined,
  price: 0,
      inStock: false,
  };

 
  const sendData = async (formValues:FormValues,{ resetForm }: { resetForm: () => void }) => {
    const res = await dispatch(editProduct.isEdit? editProductData({...editProduct.product, ...formValues}):addProductData(formValues)).unwrap();
    if (res.ok) {
      resetForm()
      navigate('/myProducts')
      if(closeForm)closeForm();
    }

  }
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={schema}
      onSubmit={sendData}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form className={style.productForm}>
          <label htmlFor="name">Name</label>
          <div className={style.modalItem} >
            <Field
              
              className ={touched.name && errors.name|| backError ? style.err : ''}
              id="name"
              type="name"
              name="name"
              placeholder="name"
            />
          </div>
     
          {touched.name && errors.name && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              <ErrorMessage name="name" />
            </div>
          )}

          <label htmlFor="category">Category</label>
          <div className={`${style.modalItem} ${touched.category && errors.category || backError ? style.err : ''}`}>
            <Field 
              as="select"
              className ={touched.category && errors.category ? style.err : ''}
              id="category"
              type="category"
              name="category"
              placeholder="category"
            >
              <option value="choose" hidden>Сhoose Category</option>
              {
                categories.map((c)=><option value={c.text} key={c.text}>{c.text}</option>)
              }
             
            </Field>
          </div>
          
          {touched.category && errors.category && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              <ErrorMessage name="category" />
            </div>
          )}
          <label htmlFor="price">Price</label>
          <div className={`${style.modalItem} ${touched.price && errors.price || backError ? style.err : ''}`}>
            <Field 
              type="number"
              className ={touched.price && errors.price ? style.err : ''}
              id="price"
              name="price"
              placeholder="Price"
            />
             
          </div>
          
          {touched.category && errors.category && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              <ErrorMessage name="password" />
            </div>
          )}

          {backError && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              {backError}
            </div>
          )}
          <label htmlFor="inStock">inStock</label>
     
            
          <div className={style.inStockSwitch}>
            <Switches
              
              name="inStock"
              id = "inStock"
            />
            </div>
           
             
          

          <Button
            style={{background:'pink'}}
            onClick={handleSubmit}
            text={!editProduct.isEdit?"Add":"Edit"}
            isAsync={true}
          />
        </Form>
      )}
    </Formik>
  );
}
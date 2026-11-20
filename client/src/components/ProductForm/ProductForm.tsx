import { Formik, Form, Field, ErrorMessage } from "formik";
import style from './ProductForm.module.css'
import Button from "../Button/Button";
import { useState } from "react";
import Switches from "../Switch";
import { useAppDispatch } from "../../redux/hooks";
import { createProductOneData } from "../../features/product/productSlice";
import type { productFormValues } from "./types";
import { useNavigate } from "react-router";
import ErrorIcon from "../../icons/ErrorIcon";
import CategorySelect from "../CategorySelect/CategorySelect";




export default function ProductForm() {
  
  const [backError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


 
  const initialValues: productFormValues= 
   {
  name: "",
  category: "",
  price: 0,
  inStock: false,
  };

 
  const sendData = async (formValues:productFormValues,{ resetForm }: { resetForm: () => void }) => {
    const res = await dispatch(createProductOneData(formValues)).unwrap();
    if (res.ok) {
      resetForm()
      navigate('/myProducts')
      
    }

  }
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={schema}
      onSubmit={sendData}
    >
      {({ errors, touched, handleSubmit,handleChange,values }) => (
        <Form className={style.productForm}>
          <label htmlFor="name">Name</label>
          <div className={style.modalItem} >
            <Field
              aria-invalid={(touched.name && !!errors.name) || !!backError}
              id="name"
              type="name"
              name="name"
              placeholder="name"
            />
          </div>
     
          {touched.name && errors.name && (
            <div className={style.errors}>
              <ErrorIcon />
              <ErrorMessage name="name" />
            </div>
          )}

          <label htmlFor="category">Category</label>
          <div className={style.modalItem}>
            <CategorySelect onChange={handleChange} value={values.category } />
          </div>
          
          {touched.category && errors.category && (
            <div className={style.errors}>
              <ErrorIcon />
              <ErrorMessage name="category" />
            </div>
          )}
          <label htmlFor="price">Price</label>
          <div className={style.modalItem}>
            <Field 
              type="number"
              aria-invalid={(touched.price && !!errors.price) || !!backError}
              id="price"
              name="price"
              placeholder="Price"
            />
             
          </div>
          
          {touched.category && errors.category && (
            <div className={style.errors}>
              <ErrorIcon />
              <ErrorMessage name="password" />
            </div>
          )}

          {backError && (
            <div className={style.errors}>
              <ErrorIcon />
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
            text="Add"
            isAsync={true}
          />
        </Form>
      )}
    </Formik>
  );
}
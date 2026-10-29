
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import { useState } from 'react';
import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import { logoutUser } from './features/user/userSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import CategProductPage from './pages/AllProductPage/CategProductPage';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import Auth from './features/user/Auth';
import Modal from './components/Modal/Modal';
import Page404 from './pages/404Page/Page404';
import MyProductsPage from './pages/MyProductsPage/MyProductsPage';
import ProductForm from './components/ProductForm/ProductForm';
import Category from './pages/Category/Category';
import SyncCateg from './features/product/SyncCateg';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen,setIsFormOpen] = useState(false)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
   const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const dispatch = useAppDispatch();
  const { user, mode, isLoadingApp } = useAppSelector((s) => s.user);
  

  return (
    <BrowserRouter>
      {isLoadingApp && <Loader />}
        <Auth />
      <SyncCateg />
      
      <Header>
        <Button
          onClick={!user ? openModal : () => dispatch(logoutUser())}
          text={!user ? mode : 'Log Out'}
          isAsync={false}
        />
      </Header>
      
      {isFormOpen && (
        <ProductForm closeForm={closeForm } />
      )}

      {isModalOpen && (
       
          <Modal close={closeModal} />
       
      )}

      <Routes>
        <Route path='/products/:categ' element={<CategProductPage />} />
        <Route path='/category' element={ <Category/>} />
        <Route path='*' element={<Page404/>}/>

     
        
            <>
            <Route path='/myProducts' element={<MyProductsPage openModal={ openForm} closeModal={closeForm} /> } />
            <Route path='/add' element={<AddProductPage />} />
            </>
             
  
        
       
        
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
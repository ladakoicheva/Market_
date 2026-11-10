import UserProfile from './pages/UserProfile/UserProfile';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useState } from 'react';
import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import { logoutUser } from './features/user/userSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import CategProductPage from './pages/CategProductPage/CategProductPage';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import Auth from './features/user/Auth';
import Modal from './components/Modal/Modal';
import Page404 from './pages/404Page/Page404';
import MyProductsPage from './pages/MyProductsPage/MyProductsPage';
import ProductForm from './components/ProductForm/ProductForm';
import AllProductPage from './pages/AllProductPage/AllProductPage';
import SyncCateg from './features/product/SyncCateg';
import History from './pages/History/History';
import HistoryItemPage from './pages/HistoryItemPage/HistoryItemPage';
import ProductItemPage from './pages/ProductItemPage/ProductItemPage';
import style from './App.module.css';


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
        <button
          className={`${style.registerBTN} ${user ? style.logoutButton : style.loginButton}`}
          onClick={!user ? openModal : () => dispatch(logoutUser())}
        >
           {!user ? mode : 'Log Out'}
        </button>
        
         
        
      </Header>
      
      {isFormOpen && (
        <ProductForm closeForm={closeForm } />
      )}

      {isModalOpen && (
       
          <Modal close={closeModal} />
       
      )}

      <Routes>
        <Route path='/products/:categ' element={<CategProductPage />} />
        <Route path='/productItem/:id' element={<ProductItemPage/> } />
        <Route path='/' element={ <AllProductPage/>} />
        <Route path='*' element={<Page404/>}/>
        <Route path='/myProducts' element={<MyProductsPage openModal={ openForm} closeModal={closeForm} /> } />
        <Route path='/add' element={<AddProductPage />} />
        <Route path='/history' element={<History />} />
        <Route path='/history/:id' element={<HistoryItemPage />} />
        <Route path='/me' element={<UserProfile/>} />
        
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
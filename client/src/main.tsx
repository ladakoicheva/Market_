import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store.ts';
import 'modern-normalize/modern-normalize.css';
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root');
if(!root) throw Error('root is undefined')

createRoot(root).render(
<Provider store={store}>
    <App />   
</Provider>


)

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import  Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import CreateCompany from "./pages/adminpages/CreateCompany";
import AddProduct from './pages/adminpages/AddProduct';
import ChangeDetails from './pages/adminpages/ChangeDetails';
import PendingOrder from './pages/adminpages/PendingOrder';
import ChangePrice from './pages/adminpages/ChangePrice';
import TotalSales from './pages/adminpages/TotalSales';
import Login from "./pages/login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { CartProvider } from './context/CartContext';


const router = createBrowserRouter([
    {
     path:'/',
     element:
     <div>
       <Navbar />
       <Home />
       <Footer />
     </div>
    },{
      path :'/contact',
      element:
      <div>
        <Navbar />
        <Contact />
        <Footer />
      </div>
    },{
      path:'/admin',
      element:
      <div>
        <Admin />
        <Footer/>
      </div>,
      children :[
        {path : 'create-company', element :<CreateCompany />},
        {path : 'add-product', element : <AddProduct />},
        {path : 'change-detail', element :<ChangeDetails />},
        {path : 'change-price', element :<ChangePrice />},
        {path : 'pending-order', element : <PendingOrder />},
        {path : 'total-sale', element : <TotalSales /> }
      ]
    },{
      path: '/login',
      element:
      <div>
        <Login />
        <Footer />
      </div>
    },{
      path: '/product',
      element:
      <div>
        <Navbar />
        <Product />
        <Footer />
      </div>
    },{
      path:'/cart',
      element:
      <div>
        <Navbar />
        <Cart />
        <Footer />
      </div>
    }
 ]);

function App() {


  return (
    <CartProvider>
    <div className="full">
      <RouterProvider router={router} />
    </div>
  </CartProvider>
    
  )
}

export default App

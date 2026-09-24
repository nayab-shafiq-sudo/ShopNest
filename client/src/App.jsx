import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import AboutUs from './pages/AboutUs'
import ReturnPolicy from './pages/ReturnPolicy'
import Disclaimer from './pages/Disclamer'
import ProductDetail from './components/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import AdminOrders from './admin/AdminOrders'
import AddProduct from './admin/AddProduct'
import AdminProducts from './admin/AdminProducts'
import AdminUsers from './admin/AdminUser'
import EditProduct from './admin/EditProduct'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetail/>} />

        <Route path='/profile' element={<Profile/>} />

        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/ordersuccess' element={<OrderSuccess/>} />

        {/* FOOTER ROUTES */}
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/admin-orders' element={<AdminOrders/>} />
        <Route path='/admin-add-product' element={<AddProduct/>} />
        <Route path='/admin-products' element={<AdminProducts/>} />
        <Route path='/admin-users' element={<AdminUsers/>} />
        <Route path='/admin-edit-products/:id' element={<EditProduct/>} />

        {/* FOOTER ROUTES */}
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/returnpolicy' element={<ReturnPolicy/>} />
        <Route path='/disclaimer' element={<Disclaimer/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App

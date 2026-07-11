import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { PageLoader } from '../components/common/Loader'

const Home = lazy(() => import('../pages/Home/Home'))
const Products = lazy(() => import('../pages/Products/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'))
const About = lazy(() => import('../pages/About/About'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Cart = lazy(() => import('../pages/Cart/Cart'))
const Checkout = lazy(() => import('../pages/Checkout/Checkout'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
const DashboardHome = lazy(() => import('../pages/Dashboard/DashboardHome'))
const DashboardProducts = lazy(() => import('../pages/Dashboard/DashboardProducts'))
const DashboardCategories = lazy(() => import('../pages/Dashboard/DashboardCategories'))
const DashboardOrders = lazy(() => import('../pages/Dashboard/DashboardOrders'))
const DashboardCustomers = lazy(() => import('../pages/Dashboard/DashboardCustomers'))
const DashboardMessages = lazy(() => import('../pages/Dashboard/DashboardMessages'))
const DashboardBooking = lazy(() => import('../pages/Dashboard/DashboardBooking'))
const DashboardAnalytics = lazy(() => import('../pages/Dashboard/DashboardAnalytics'))
const DashboardSettings = lazy(() => import('../pages/Dashboard/DashboardSettings'))
const DashboardProfile = lazy(() => import('../pages/Dashboard/DashboardProfile'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<DashboardCategories />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="customers" element={<DashboardCustomers />} />
          <Route path="messages" element={<DashboardMessages />} />
          <Route path="booking" element={<DashboardBooking />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

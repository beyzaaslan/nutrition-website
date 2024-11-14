import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CategoryProductsPage from './components/Categories/CategoryProductsPage';
import { 
    About, 
    Account, 
    Cart, 
    Contact, 
    Homepage, 
    Page404, 
    Payment, 
    SSS ,
    Login,
    ProductList,
    Detail,
} from './pages'; 

const AppRouter = () => {
  return (
            <Routes>
                <Route path="/" element={<MainLayout><Homepage /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/login" element={<MainLayout><Login/></MainLayout>} />
                <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
                <Route path="/payment" element={<MainLayout><Payment /></MainLayout>} />
                <Route path="/404" element={<MainLayout><Page404 /></MainLayout>} />
                <Route path="/sss" element={<MainLayout><SSS /></MainLayout>} />
                <Route path="/detail/:productId" element={<MainLayout><Detail /></MainLayout>} />
                <Route path="/all-products" element={<MainLayout><ProductList /></MainLayout>} />
                <Route path="/:categoryName" element={<MainLayout><CategoryProductsPage /></MainLayout>} />
                <Route path="*" element={<MainLayout><Page404 /></MainLayout>} /> {/* Catch-all route for 404 */}
            </Routes>
  )
}
export default AppRouter

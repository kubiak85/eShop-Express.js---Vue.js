
import Home from './components/Home.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import Category from './components/category/Category.vue'
import Admin from './components/admin/Admin.vue'
import AdminProducts from './components/admin/AdminProducts.vue'
import AdminUnrealizedOrder from './components/admin/AdminUnrealizedOrder.vue'
import AdminAllOrder from './components/admin/AdminAllOrder.vue'
import AddProduct from './components/products/AddProduct.vue'
import ModifyProduct from './components/products/ModifyProduct.vue'
import Basket from './components/order/Basket.vue'
import Order from './components/order/Order.vue'
import ChangeStatusOrder from './components/order/ChangeStatusOrder.vue'
export default [
    {
      path: '/',
      component: Home
    },
    {
        name:'category',
        path: '/category/:id',
        component: Category
    },
    {
      name:'admin',
      path: '/admin',
      component: Admin
    },
    {
      name:'adminProducts',
      path: '/admin_products',
      component: AdminProducts
    },
    {
      name:'adminUnrealizedOrder',
      path: '/admin_unrealized_order',
      component: AdminUnrealizedOrder
    },
    {
      name:'adminAllOrder',
      path: '/admin_all_order',
      component: AdminAllOrder
    },
    {
      name:'adminAddProduct',
      path: '/admin_add_product',
      component: AddProduct
    },
    {
      name:'adminModifyProduct',
      path: '/admin_modify_product/:id',
      component: ModifyProduct
    },
    {
      name:'adminModifyOrderStatus',
      path: '/admin_modify_order_status/:id',
      component: ChangeStatusOrder
    },
    {
      name:'Basket',
      path: '/basket',
      component: Basket
    },
    {
      name:'Order',
      path: '/order',
      component: Order
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ];

  
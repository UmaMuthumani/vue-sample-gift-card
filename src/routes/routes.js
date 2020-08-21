import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import Order from "../components/Order.vue";
import OrderHistory from "../components/OrderHistory.vue";
import ManageOrders from "../components/ManageOrders.vue";

export default [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/order',
        name: 'Order',
        component: Order
    },
    {
        path: '/orderHistory',
        name: 'orderHistory',
        component: OrderHistory
    },
    {
        path: '/manageOrders',
        name: 'ManageOrders',
        component: ManageOrders
    }
]
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        categories: [],
        products: [],
        basket: [],
        orders: [],
        status: [],
    },
    mutations: {
        setCategories (state, payload){
            return state.categories = payload.categories;
        },
        setProductsAdmin (state, payload){
            return state.products = payload.products;
        },
        deleteProductAdmin (state, payload){
            return state.products = state.products.filter((val) => {return payload.id !== val._id})
        },
        addProductToBasket (state, payload){
            let tmp = state.basket
            tmp.push(payload.product)
            return state.basket = tmp
        },
        removeProductFromBasket (state, payload){
            let tmp = state.basket.filter((val) => {return payload.id !== val._id})
            return state.basket = tmp
        },
        removeAllProductFromBasket (state) {
            return state.basket = []
        },
        incrementItemBasket (state, payload){
            let basket = state.basket
            let tmp = null
            let i = 0
            basket.forEach((value) => {
                if(value._id === payload.product.id)
                    tmp = i
                i++
            })
            basket.splice(tmp, 1)
            payload.product.amount += 1
            basket.push(payload.product)
            return state.basket = basket
        },
        decrementtItemBasket (state, payload){
            let basket = state.basket
            let tmp = null
            let i = 0
            basket.forEach((value) => {
                if(value._id === payload.product.id)
                    tmp = i
                i++
            })
            basket.splice(tmp, 1)
            if(payload.product.amount !== 1){
                payload.product.amount -= 1
                basket.push(payload.product)
            }
            return state.basket = basket
            
        },
        changeStatusOrderAdmin (state, payload){
            let orders = state.orders
            let tmp = null
            let i = 0
            orders.forEach((value) => {
                if(value._id === payload.order._id)
                    tmp = i
                i++
            })
            orders.splice(tmp, 1)
            orders.push(payload.order)
            return state.orders = orders;
        },
        setOrdersAdmin (state, payload){
            return state.orders = payload.orders;
        },
        setOrdersStatusAdmin (state, payload){
            return state.status = payload.status;
        },
        increment (state, payload){
            return state.count = state.count + payload.amount;
        },
        decrement (state, payload){
            return state.count = state.count - payload.amount;
        }
    },
    actions: {
        setCategories (context, payload) {
            context.commit('setCategories', payload)
        },
        setProductsAdmin (context, payload) {
            context.commit('setProductsAdmin', payload)
        },
        deleteProductAdmin (context, payload) {
            context.commit('deleteProductAdmin', payload)
        },
        addProductToBasket (context, payload) {
            context.commit('addProductToBasket', payload)
        },
        removeProductFromBasket (context, payload) {
            context.commit('removeProductFromBasket', payload)
        },
        incrementItemBasket (context, payload) {
            context.commit('incrementItemBasket', payload)
        },
        decrementtItemBasket (context, payload) {
            context.commit('decrementtItemBasket', payload)
        },
        removeAllProductFromBasket (context) {
            context.commit('removeAllProductFromBasket')
        },
        setOrdersAdmin (context, payload) {
            context.commit('setOrdersAdmin', payload)
        },
        setOrdersStatusAdmin (context, payload) {
            context.commit('setOrdersStatusAdmin', payload)
        },
        changeStatusOrderAdmin (context, payload) {
            context.commit('changeStatusOrderAdmin', payload)
        },
        increment (context, payload) {
            context.commit('increment', payload)
        },
        decrement (context, payload) {
            context.commit('decrement', payload)
        }
  },
  getters: {
    allBasketbasket: state => {
      return state.basket
    }
  }
})
export default store;
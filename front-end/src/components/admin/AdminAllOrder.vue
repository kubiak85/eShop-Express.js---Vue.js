
<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-4">Panel Administratora - Wszystkie zamówienia sklepu</h1>
        </div>
    </div>
    <div v-if="init">
      <div class="container">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Nazwa użytkownika</th>
                <th scope="col">Email użytkownika</th>
                <th scope="col">Telefon użytkownika</th>
                <th scope="col">Zamówienie</th>
                <th scope="col">Status</th>
                <th scope="col">Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" v-bind:key="order._id">
                <td>{{order.userName }}</td>
                <td>{{order.userEmail}}</td>
                <td>{{order.userPhone}}</td>
                <td>
                  <p v-for="v in order.orders" v-bind:key="v._id">
                      Nazwa: <b>{{v.name}}</b>
                      <br>
                      Sztuk: <b>{{v.amount}}</b>
                  </p>
                </td>
                <td>{{order.status}}</td>
                <td>
                  <div v-if="order.date">
                    {{order.date}}
                  </div>
                  <div v-else>
                    Brak daty
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <div v-else>
      <div class="container">
          <div class="text-center">
            <h4>Coś poszło nie tak z pobraniem danych o zamówieniach</h4>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
import store from '../../store/store';
import * as type from '../../store/mutationTypes/types'
export default {
  name: 'AdminAllOrder',
  data () {
    return {
      init: false
    }
  },
  computed: mapState({
      orders: (state) => {
        let changeOrder = state.orders
        changeOrder = changeOrder.map((value) =>{
          
          let statusName = ""
          state.status.forEach((val) => {
            if(val._id === value.status)
              statusName = val.name
          })
          let orders = []
          value.orders.forEach((val) => {
            state.products.forEach((product) => {
              if(val.productId === product._id)
                orders.push({name: product.name, amount: val.amount})
            })
          })
          let obj = {
            userName: value.userName,
            userEmail: value.userEmail,
            userPhone: value.userPhone,
            status: statusName,
            orders: orders,
            date: value.date
          }
          return obj
        })
        
        let sortCompare = (a,b) => {
          if ( a.status < b.status ){
            return -1;
          }
          if ( a.status > b.status ){
            return 1;
          }
          return 0;
        }

        changeOrder.sort( sortCompare );

        return changeOrder
      }
  }),
  mounted () {
      Vue.axios.get('http://localhost:3000/orders')
        .then(response => {
            if(response.status === 200){
                store.dispatch({
                  type: type.SetOrdersAdmin,
                  orders: response.data
                })
                
                Vue.axios.get('http://localhost:3000/status')
                 .then(response => {
                    store.dispatch({
                      type: type.SetOrdersStatusAdmin,
                      status: response.data
                    })

                   if(response.status === 200){
                      Vue.axios.get('http://localhost:3000/products')
                      .then(response => {
                        if(response.status === 200){
                            store.dispatch({
                              type: type.SetProductsAdmin,
                              products: response.data
                            })
                            this.init = true
                        }
                      })
                   }
                 })
            }
        })
  }
}
</script>

<style scoped>

</style>

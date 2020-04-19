
<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-5">Koszyk</h1>
        </div>
    </div>
    <div class="container">
      <div v-if="basket.length">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Opis</th>
                <th scope="col">Cena [ZŁ]</th>
                <th scope="col">Waga [KG]</th>
                <th scope="col">Kategoria</th>
                <th scope="col">Ilość sztuk</th>
                <th scope="col">Akcja</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in basket" v-bind:key="product._id">
                <td>{{product.name}}</td>
                <td>{{product.description}}</td>
                <td>{{product.price.$numberDecimal}}</td>
                <td>{{product.weight.$numberDecimal}}</td>
                <td>{{product.categoryName}}</td>
                <td>{{product.amount}}</td>
                <td>
                  <button class="btn btn-outline-success" v-on:click="incrementItemBasket(product)">Dodaj</button>
                  <button class="btn btn-outline-danger ml-2" v-on:click="removeProduct(product)">Usuń</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-5 text-right">
            <router-link to="/order" class="btn btn-outline-primary">Przejdź do działu zakupów</router-link>
          </div>
      </div>
      <div v-else>
        <div class="text-center mt-5">
            <h4>Przykro nam, ale twój koszyk jest pusty</h4>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../store/store';
import * as type from '../../store/mutationTypes/types'
export default {
  name: 'Basket',
  computed: mapState({
      basket: (state) => {return state.basket},
  }),
  methods: {
    incrementItemBasket: (product) =>{
      store.dispatch({
        type: type.IncrementItemBasket,
        product: product
      })
    },
    removeProduct: (product) =>{
      store.dispatch({
        type: type.DecrementtItemBasket,
        product: product
      })
      
    },
  }
}
</script>

<style scoped>

</style>

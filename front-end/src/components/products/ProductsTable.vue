
<template>
  <div>
    <div v-if="products.length">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nazwa</th>
            <th scope="col">Opis</th>
            <th scope="col">Cena [ZŁ]</th>
            <th scope="col">Waga [KG]</th>
            <th scope="col">Kategoria</th>
            <th scope="col">Akcja</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" v-bind:key="product._id">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.price.$numberDecimal}}</td>
            <td>{{product.weight.$numberDecimal}}</td>
            <td>{{product.categoryName}}</td>
            <td>
              <button class="btn btn-outline-danger" v-on:click="removeProduct(product._id)">Usuń</button>
              <router-link :to="{ name: 'adminModifyProduct', params: { id: product._id }}" class="ml-1 btn btn-outline-success" append>Modyfikuj</router-link>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="text-center">
        <h3>Brak produktów do wyświetlenia</h3>
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
  name: 'ProductsTable',
  computed: mapState({
      products: (state) => {return state.products},
      categories: (state) => {return state.categories},
  }),
  mounted () {
    console.log(this.$store.state.categories)
    if(this.$store.state.categories.length ===0){
      Vue.axios.get('http://localhost:3000/categories')
      .then(response => {
        if(response.status === 200){
          store.dispatch({
            type: type.SetCategories,
            categories: response.data
          })
        }
      })
    }

    Vue.axios.get('http://localhost:3000/products')
      .then(response => {
        if(response.status === 200){
          let tmp = response.data.map((product) => {
              let catName = "Brak kategorii"
              let categoryName = this.$store.state.categories.filter((category)=>{
                return category._id === product.categoryId
              })
              if(categoryName.length > 0)
                catName = categoryName[0]
              
              product.categoryName = catName.name
              return product

          })
          store.dispatch({
            type: type.SetProductsAdmin,
            products: tmp
          })
        }
      })
  },
  methods: {
    removeProduct: (id) =>{
      Vue.axios.delete("http://localhost:3000/products/"+id)
      .then(response => {
        if(response.status === 200){
          store.dispatch({
            type: type.DeleteProductAdmin,
            id: id
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

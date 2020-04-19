<template>
  <div>
      <section class="jumbotron text-center">
        <div class="container">
          <h1>Witamy w prawie allegro</h1>
          <p class="lead text-muted">Kupuj tysiące rzeczy po taniości</p>
        </div>
      </section>
      <div class="container">
        <p v-if="errors.length" class="alert alert-danger" role="alert">
          <b>Spróbuj poprawić te błędy:</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
          </ul>
        </p>
        <form v-on:submit.prevent="onSubmit">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="nameInput">Nazwa produktu</label>
              <input type="text" class="form-control" id="nameInput" placeholder="Wpisz nazwę produktu" v-model="name">
            </div>
            <div class="col-md-6 mb-3">
              <label for="descriptionInput">Wpisz opis produktu</label>
              <input type="text" class="form-control" id="descriptionInput" placeholder="Wpisz nazwę produktu" v-model="description">
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="categoryName">Kategoria produku</label>
                <select  class="form-control" id="categoryName" v-model="categoryId">
                  <option v-for="category in categories" v-bind:key="category._id" :value=category._id>
                    {{ category.name }}
                  </option>  
                </select>
            </div>
            <div class="col-md-6 mt-4">
               <input type="submit" value="Wyszukaj produkt" class="btn btn-outline-primary">
            </div>
          </div>
          </form>
      </div>
      <div class="container">
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
                  <div v-if="checkInBasket(product._id)">
                    <button class="btn btn-outline-danger" v-on:click="removeProduct(product._id)">Usuń produkt</button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-success" v-on:click="buyProduct(product)">Kup teraz</button>
                  </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
import store from '../store/store';
import * as type from '../store/mutationTypes/types'
export default {
  name: 'Home',
  data () {
    return {
      errors: [],
      name: "",
      description: "",
      categoryId: ""
    }
  },
  computed: mapState({
      products: (state) => {return state.products},
      categories: (state) => {return state.categories},
      basket: (state) => {return state.basket},
  }),
  mounted () {
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
          let productList = response.data.map((product) => {
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
            products: productList
          })
        }
      })
  },
  methods: {
    onSubmit () {
      this.errors = [];

      if (this.name === "" && this.description === "" && this.categoryId === "") {
        this.errors.push('Chcąc wyszukać, musisz wypełnić któreś z pól');
        return
      }

      Vue.axios.get('http://localhost:3000/products')
      .then(response => {
        if(response.status === 200){
          let productList = response.data.filter((product) => {
            console.log(product.name.includes(this.name))
            let check = false
            if(product.name.toLowerCase().includes(this.name.toLowerCase()) && this.name !== "")
              check = true
            if(product.description.toLowerCase().includes(this.description.toLowerCase()) && this.description !== "")
              check = true
            if(product.categoryId === this.categoryId)
              check = true
            return check
          })
          productList = productList.map((product) => {
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
            products: productList
          })
        }
      })
      
    },
    buyProduct: (product) =>{
      product.amount = 1
      store.dispatch({
        type: type.AddProductToBasket,
        product: product
      })
    },
    removeProduct: (id) =>{
      store.dispatch({
        type: type.RemoveProductFromBasket,
        id: id
      })
    },
    checkInBasket: (id) =>{
      let check = false
      store.state.basket.forEach((value) => {
        if(value._id === id)
          check = true
      })
      return check
    }

  }
}
</script>

<style scoped>

</style>

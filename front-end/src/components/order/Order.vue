
<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-5">Podsumowanie</h1>
        </div>
    </div>
    <div v-if="addStatus.length">
      <div class="container">
        <div class="text-center">
           <h4>Gratulacje złożyłeś zamówienie</h4>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div v-if="basket.length">
            <h4> Kupujesz te przedmioty</h4>
            <table class="table table-bordered mt-3">
              <thead>
                <tr>
                  <th scope="col">Nazwa</th>
                  <th scope="col">Opis</th>
                  <th scope="col">Cena [ZŁ]</th>
                  <th scope="col">Waga [KG]</th>
                  <th scope="col">Kategoria</th>
                  <th scope="col">Ilość sztuk</th>
                  
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
                </tr>
              </tbody>
            </table>
            <div class="text-right">
              <h4>Łącznie do zapłacena: {{cost}} zł</h4>
            </div>


            <h4> Wypełnij ten formularz</h4>
            <p v-if="errors.length" class="alert alert-danger mt-4 mb-4" role="alert">
            <b>Spróbuj poprawić te błędy:</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
            </ul>
          </p>
            <form v-on:submit.prevent="onSubmit">
              <div class="row">
                  <div class="col-md-6 mb-3">
                      <label for="nameInput">Nazwa użytkownika</label>
                      <input type="text" class="form-control" id="nameInput" placeholder="Wpisz nazwę użytkownika" v-model="name">
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="emailInput">Adres email</label>
                      <input type="email" class="form-control" id="emailInput" placeholder="Wpisz adres email" v-model="email">
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6 mb-3">
                      <label for="phoneInput">Numer telefonu</label>
                      <input type="tel" class="form-control" id="phoneInput" placeholder="Wpisz numer telefonu bez kierunkowego" v-model="phone">
                  </div>
                  <div class="col-md-6 mt-4">
                      <input type="submit" value="Wyślij zamówienie" class="btn btn-outline-primary">
                  </div>
              </div>
              </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import store from '../../store/store';
import * as type from '../../store/mutationTypes/types'
export default {
  name: 'Order',
  computed: mapState({
      basket: (state) => {return state.basket},
      cost: (state) => {
        let tmp = 0
        state.basket.forEach((value) => {
          tmp += value.amount * value.price.$numberDecimal
        })
        let factor = Math.pow(10, 2);
        return Math.round(tmp*factor)/factor
      }
  }),
  data () {
        return {
            name: "",
            email: "",
            phone: "",
            errors: [],
            addStatus: ""
        }
    },
  methods: {
   onSubmit () {
        this.errors = [];

        if (this.name === "" && this.email === "" && this.phone === "") 
            this.errors.push('Chcąc wysłać zamówienie musisz wypełnić wszystkie pola')

        if (this.name.length < 6 || this.name.length > 20) 
            this.errors.push('Nazwa użytkownika powinna zawierać od 6 do 20 znaków')
        
        if (this.email.length === 0) 
            this.errors.push('Musisz podać adres email')

        if (isNaN(parseInt(this.phone)))
            this.errors.push('Musisz podać prawidłowy numer telefonu, bez kierunkowego')


        if(this.errors.length > 0)
            return

        let orderProducts = this.$store.state.basket.map((value) => {
          return {productId: value._id, amount: value.amount}
        })
        console.log(orderProducts)
            var _this = this
            Vue.axios.post('http://localhost:3000/orders', {
                userName: this.name,
                userEmail: this.email,
                userPhone: this.phone,
                orders: orderProducts
            })
            .then(function (response) {
                if(response.status === 200)
                    _this.addStatus = "Dodano zamówienie"
                    _this.name = ""
                    _this.email = ""
                    _this.phone = ""
                    store.dispatch({
                      type: type.RemoveAllProductFromBasket
                    })
            })
            .catch(function (error) {
                error.response.data.errors.forEach((value) => {
                    _this.errors.push(value.msg)
                });
            });
        
   }
  }
}
</script>

<style scoped>

</style>

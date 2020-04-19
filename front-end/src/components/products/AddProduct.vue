<template>
    <div>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-4">Panel Administratora - Dodawanie produktu</h1>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6 text-center">
                <h3>Wypełnij formularz</h3>
                </div>
                <div class="col-6 text-center">
                <router-link :to="{ name: 'adminProducts'}" class="btn btn-secondary" >Powrót do poprzedniej karty</router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div v-if="addStatus">
                <div class="alert alert-success mt-3" role="alert">
                    {{addStatus}}
                </div>
            </div>
            <div v-if="errors.length">
                <div class="alert alert-danger mt-3" role="alert">
                    <ul v-for="error in errors" v-bind:key="error.id">
                        <li>{{error}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row mt-2">
                <div class="col-12">
                    <form v-on:submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="nameInput">Nazwa produktu</label>
                            <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Wpisz nazwę produktu" v-model="name">
                            <small id="nameHelp" class="form-text text-muted">Pole wymagane</small>
                        </div>
                        <div class="form-group">
                            <label for="descriptionInput">Opis produktu</label>
                            <textarea class="form-control" id="descriptionInput" aria-describedby="descriptionHelp" rows="3" placeholder="Wpisz opis produktu" v-model="description"></textarea>
                            <small id="descriptionHelp" class="form-text text-muted">Pole wymagane</small>
                        </div>
                        <div class="form-group">
                            <label for="priceInput">Cena produktu</label>
                            <input type="text" class="form-control" id="priceInput" aria-describedby="priceHelp" placeholder="Wpisz cenę produktu" v-model="price">
                            <small id="priceHelp" class="form-text text-muted">Pole wymagane</small>
                        </div>
                        <div class="form-group">
                            <label for="weightInput">Waga produktu</label>
                            <input type="text" class="form-control" id="weightInput" aria-describedby="weightHelp" placeholder="Wpisz wagę produktu" v-model="weight">
                            <small id="weightHelp" class="form-text text-muted">Pole wymagane</small>
                        </div>
                        <div class="form-group">
                            <label for="categoryName">Kategoria produku</label>
                            <select  class="form-control" id="categoryName" v-model="categoryId">
                                    <option v-for="category in categories" v-bind:key="category._id" :value=category._id>
                                        {{ category.name }}
                                    </option>
                                
                            
                            </select>
                        </div>
                        <input type="submit" value="Dodaj produkt" class="btn btn-primary">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
export default {
  name: 'ProductsTable',
    data () {
        return {
            name: "",
            description: "",
            price: "",
            weight: "",
            categoryId: "",
            errors: [],
            addStatus: null,
        }
    },
  computed: mapState({
      categories: (state) => {return state.categories},
  }),
  methods:{
    onSubmit () {
        let weightTmp = parseFloat(this.weight)
        let priceTmp = parseFloat(this.price)

        if(isNaN(weightTmp))
            weightTmp = this.weight

        if(isNaN(priceTmp))
            priceTmp = this.price
            this.errors = []
            var _this = this
            Vue.axios.post('http://localhost:3000/products', {
                name: this.name,
                description: this.description,
                price: priceTmp,
                weight: weightTmp,
                categoryId: this.categoryId
            })
            .then(function (response) {
                if(response.status === 200)
                    _this.addStatus = "Dodano produkt do bazy danych"
                    _this.name = ""
                    _this.description = ""
                    _this.price = ""
                    _this.weight = ""
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
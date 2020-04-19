<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-4">Panel Administratora - Niezrealizowane zamówienia sklepu</h1>
        </div>
    </div>
    <div v-if="init">
      <div class="container">
      <div class="text-right">
          <router-link :to="{ name: 'adminUnrealizedOrder'}" class="btn btn-secondary" append>Przejdź do poprzedniej strony</router-link>
      </div>
            <div v-if="modifyStatus">
                <div class="alert alert-success mt-3" role="alert">
                {{modifyStatus}}
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
         <div class="text-left">
             <p>Nazwa użytkownika: <b>{{order.userName}}</b></p>
             <p>Adres email użytkownika: <b>{{order.userEmail}}</b></p>
             <p>Telefon użytkownika: <b>{{order.userPhone}}</b></p>
             <p>Status: <b>{{order.statusName}}</b></p>

             <div v-if="order.status !== '5e0f90194c16ef52205d9531'">
                    <button class="btn btn-outline-primary mt-2" v-on:click="changeStatus('5e0f90194c16ef52205d9531')">NIEZATWIERDZONE</button>
             </div>
             
             <div v-if="order.status !== '5e0f90214c16ef52205d9532'">
                    <button class="btn btn-outline-info mt-2" v-on:click="changeStatus('5e0f90214c16ef52205d9532')">ZATWIERDZONE</button>
             </div>
             <div v-if="order.status !== '5e0f90284c16ef52205d9533'">
                    <button class="btn btn-outline-danger mt-2" v-on:click="changeStatus('5e0f90284c16ef52205d9533')">ANULOWANE</button>
             </div>
             <div v-if="order.status !== '5e0f902d4c16ef52205d9534'">
                    <button class="btn btn-outline-success mt-2" v-on:click="changeStatus('5e0f902d4c16ef52205d9534')">ZREALIZOWANE</button>
             </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
          <div class="text-center">
            <h4>Coś poszło nie tak z pobraniem danych o zamówieniu</h4>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'ChangeStatusOrder',
  data () {
    return {
      init: false,
      errors: [],
      order: null,
      status: null,
      modifyStatus: '',
      name: 'Vue.js'
    }
  },
  mounted () {
      Vue.axios.get('http://localhost:3000/orders/'+this.$route.params.id)
        .then(response => {
            if(response.status === 200){
                this.order = response.data
                Vue.axios.get('http://localhost:3000/status')
                .then(response => {
                    if(response.status === 200){
                        this.status = response.data
                        this.init = true
                        response.data.forEach((val) => {
                            if(val._id === this.order.status)
                                this.order.statusName = val.name
                        })
                    }
                })
            }
        })
   
  },
  methods: {
      
      changeStatus: function (status) {
          var _this = this
          _this.errors = []
          _this.modifyStatus = ""
        Vue.axios.put('http://localhost:3000/orders/'+this.order._id+'/stan', {
          status: status
        })
        .then(function (response) {
            if(response.status === 200){
                if(status === "5e0f90194c16ef52205d9531")
                    _this.order.statusName = "NIEZATWIERDZONE"
                if(status === "5e0f90194c16ef52205d9531")
                    _this.order.statusName = "ZATWIERDZONE"
                if(status === "5e0f90284c16ef52205d9533")
                    _this.order.statusName = "ANULOWANE"
                if(status === "5e0f902d4c16ef52205d9534")
                    _this.order.statusName = "ZREALIZOWANE"
                _this.order.status = status
                _this.modifyStatus = "Zmodyfikowano status"
            }
        })
        .catch(function (error) {
            console.log(error.response.data.errors)
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

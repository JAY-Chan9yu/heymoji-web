<script src="main.js"></script>
<template>
  <div id="app">
    <header>
      <img src="./assets/dano.jpeg" width="150">
    </header>

    <div v-if="isLoading">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>

    <UserList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import UserList from './components/UserList.vue'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    UserList
  },
  computed: {
    ...mapState(['isLoading', 'refCount'])
  },
  created() {
    this.axios.interceptors.request.use((config) => {
      this.$store.commit('loading', true);
      return config;
    }, (error) => {
      this.$store.commit('loading', false);
      return Promise.reject(error);
    });

    this.axios.interceptors.response.use((response) => {
      this.$store.commit('loading', false);
      return response;
    }, (error) => {
      this.$store.commit('loading', false);
      return Promise.reject(error);
    });
  }
}
</script>

<style>
  @import url('https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css');

  #app {
    font-family: 'NanumSquareRound', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  header{
    width:100%;
    position:relative;
    height:60px;
    text-align: left;
  }

  body {
    background-color: white;
  }

  /** https://loading.io/css/ */
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #ddd;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
</style>

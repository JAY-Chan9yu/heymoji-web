<template>
  <div>
    <div class="table-title" style="display: inline-block;">
      <div class="filter">
        <p>년 필터링</p>
        <v-text-field solo v-model="year" rounded placeholder="year"></v-text-field>
      </div>
      <div class="filter">
        <p>월 필터링</p>
        <v-text-field solo v-model="month" rounded placeholder="month"></v-text-field>
      </div>
      <v-btn rounded color="primary" dark v-on:click="getMemberList(year, month)">
        가져오기
      </v-btn>
    </div>
    <div class="table-title">
      <h3>
        <span
          v-for="(t, index) in title"
          :key="index"
          class="item"
          :style="{animationDelay: index*100+'ms'}"
          v-text="t"
        />
      </h3>
    </div>
    <div v-if="hasResult">
      <div class="content-desc">
        <div class="content__index">순위</div>
        <div class="content__user">멤버</div>
        <div class="content__get">받은 ❤️</div>
        <div class="content__using">오늘 남은 ❤️</div>
      </div>
      <div v-for="(user, index) in users" v-bind:key="user.id" class="content">
          <div class="content__index">
            <span v-if="index === 0">🥇</span>
            <span v-else-if="index === 1">🥈</span>
            <span v-else-if="index === 2">🥉</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="content__user">
            <img class="avatar" :src="user.avatar_url">
            {{ user.username }}
          </div>
          <div class="content__get"><span class="received_reaction">{{ user.received_reaction }}</span></div>
          <div class="content__using"><span class="my_reaction">{{ user.my_reaction }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserList',
  data: function () {
    // this.methods.searchTerm();
    var date = new Date();

    return {
      title: "✨무야호~그만큼 고맙다는거지! Emoji Rank✨",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      users: []
    }
  },
  computed: {
    hasResult: function () {
      return this.users.length > 0
    },
  },
  methods: {
    getMemberList: function (year, month) {
      if(year === '') year = null
      if(month === '') month = null

      var config = {
        headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'},
        params: {'year': year, 'month': month},
      }
      const baseURI = 'HOST_ADDRESS';

      axios.get(`${baseURI}/users`, config)
          .then((result) => {
            console.log(result)
            this.users = result.data
          })
    },
  },
  mounted() {
    this.getMemberList(this.year, this.month);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    font-size: 16px;
    font-weight: 400;
    text-rendering: optimizeLegibility;
  }

  div.table-title {
    display: block;
    margin: auto;
    max-width: 800px;
    padding:5px;
    width: 100%;
  }

  .table-title h3 {
     color: black;
     font-size: 30px;
     font-weight: 400;
     font-style:normal;
     text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
     text-transform:uppercase;
  }

  .content-desc {
    margin: auto;
    max-width: 600px;
    padding:5px;
    width: 100%;
    border: 1px solid #343a45;
    border-radius: 30px;
    box-shadow: 3px 3px 3px grey;
    display: block;
    font-weight: bold;
    background: powderblue;
    margin-bottom: 5px;
  }

  .content {
    margin: auto;
    max-width: 600px;
    padding:5px;
    width: 100%;
    border: 1px solid #343a45;
    border-radius: 30px;
    box-shadow: 3px 3px 3px grey;
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .content:hover {
    background-color: #CCFFFF;
  }

  .content__index {
    display: inline-block;
    width: 10%
  }

  .content__user {
    display: inline-block;
    text-align: left;
    width: 30%
  }

  .content__get {
    display: inline-block;
    width: 20%
  }

  .content__using {
    display: inline-block;
    width: 20%
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 70%;
    cursor: inherit;
    vertical-align: middle;
  }

  .filter {
    display: inline-block;
    width: 100px;
    margin-right: 20px;
  }

  .filter p{
    margin: 10px;
  }

  @keyframes text-in {
    0% {
      transform: translate(0, -20px);
      opacity: 0;
    }
  }

  .received_reaction {
    font-size: large;
    color: red;
  }

  .my_reaction {
    font-size: large;
    color: green;
  }

  .item {
    display: inline-block;
    min-width: 0.3em;
    font-size: 2rem;
    animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }
</style>

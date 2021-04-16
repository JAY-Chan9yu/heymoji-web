<template>
  <div>
    <div class="table-title" style="display: inline-block;">
      <div style="display: inline-block">
        <p>년 필터링</p> <input id="year" v-model="year" placeholder="여기를 수정해보세요">
      </div>
      <div style="display: inline-block">
        <p>월 필터링</p> <input id="month" v-model="month" placeholder="여기를 수정해보세요">
      </div>
      <button id="getUserBtn" v-on:click="getMemberList(year, month)">가져오기</button>
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
        <div class="content__using">보낸 ❤️</div>
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
          <div class="content__get">❣️ x {{ user.received_reaction }}</div>
          <div class="content__using">❣️ x {{ user.my_reaction }}</div>
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
      title: "✨무야호~그만큼 고맙다는거지~랭킹✨",
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
      // using JSONPlaceholder
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
    margin-bottom: 5px;
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

  @keyframes text-in {
    0% {
      transform: translate(0, -20px);
      opacity: 0;
    }
  }
  .item {
    display: inline-block;
    min-width: 0.3em;
    font-size: 2rem;
    animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }
</style>

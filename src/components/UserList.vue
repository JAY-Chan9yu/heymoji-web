<template>
  <div>
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

    <div class="table-title" style="display: inline-block;">
      <div class="filter">
        <v-text-field solo v-model="year" rounded placeholder="year"></v-text-field>
      </div>
      <div class="filter">
        <v-text-field solo v-model="month" rounded placeholder="month"></v-text-field>
      </div>
      <v-btn rounded v-on:click="getMemberList(year, month)" color="rgb(255, 111, 97)" style="color: white; font-weight: bolder">
        가져오기
      </v-btn>
    </div>

    <div>💡이름 옆 숫자는 크루들에게 받은 이모지 모든 합계입니다.</div>

    <div v-if="hasResult" class="container" >
      <div v-for="(user, index) in users" v-bind:key="user.id" class="content" v-on:click="getReactionList(user.id)">
          <div class="content__index">
            <span>{{ index + 1 }}.</span>
          </div>
          <div class="content__user"><img class="avatar" :src="user.avatar_url"> {{ user.username }}</div>
          <div class="content__get"><span class="received_reaction">{{ user.received_reaction }}</span></div>
<!--          <v-btn rounded  color="#dddddd" style="color: black; font-weight: bolder">상세보기</v-btn>-->
          <reaction-list data-active="false" :ref="'reaction-' + user.id" :title=reactionTitle style="display: block"></reaction-list>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReactionList from "./ReactionList";

export default {
  name: 'UserList',
  components: {
    'reaction-list': ReactionList
  },
  data: function () {
    let date = new Date();

    return {
      title: "✨최고의 동료가 최고의 복지다✨",
      reactionTitle: "리액션한 크루 리스트",
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

      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
        },
        params: {'year': year, 'month': month},
      }
      const baseURI = "HOST_ADDRESS";

      axios.get(`${baseURI}/users`, config)
        .then((result) => {
          // console.log(result)
          this.users = result.data
        })
    },
    getReactionList: function (userId) {
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
        },
      }
      const baseURI = "HOST_ADDRESS";
      let isActive = this.$refs['reaction-'+ userId][0].$attrs['data-active'];

      // false = 리액션한 크루들의 리스트를 보여준다.
      // true = 리스트를 접는다.
      if (isActive === 'false') {
        axios.get(`${baseURI}/users/${userId}/reactions/`, config)
          .then((result) => {
            // console.log(result.data);
            this.$refs['reaction-' + userId][0].setValue(result.data)
            this.$refs['reaction-'+ userId][0].$attrs['data-active'] = "true"
          })
      } else {
        this.$refs['reaction-'+ userId][0].$attrs['data-active'] = "false"
        this.$refs['reaction-' + userId][0].setValue([])
      }
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

  .container {
    align-items: center;
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

  .content {
    min-height: 70px;
    padding:15px;
    margin: 10px;
    width: 550px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    box-shadow: 3px 3px 3px #dddddd;
    display: inline-block;
    /*float: left;*/
    font-weight: bold;
  }

  .content:hover {
    box-shadow: 0 0 10px 3px mediumseagreen;
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
    color: coral;
  }

  .item {
    display: inline-block;
    min-width: 0.3em;
    font-size: 2rem;
    animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }
</style>

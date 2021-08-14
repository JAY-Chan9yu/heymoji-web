<template>
  <div>
    <div v-for="(v, index) in value" v-bind:key="index" class="user-list">
      <div v-if="index === 0" class="reaction">{{title}}</div>
      <span class="username">{{ v.username }} - </span>
      <span v-for="(em, index) in v.emoji" v-bind:key="index" class="emoji">
        {{ convertStrToEmoji(em.type) }}: {{ em.count}}
      </span><br/>
    </div>
  </div>
</template>

<script>
export default {
  name: "reactionList",
  data: function () {
    return {
      value: 0
    };
  },
  props: ["title"],
  methods: {
    setValue: function(value) {
        this.value = value;
    },
    convertStrToEmoji: function (emojiType) {
      switch (emojiType) {
        case '기도':
        case 'pray':
          return '🙏'
        case 'heart':
          return '❤️'
        case '+1':
          return '👍'
        case 'eye_shaking':
          return '👀'
        case 'wow':
        case 'rainbowow':
          return '🤩(wow)'
        case 'wonderfulk':
          return '크...'
        case '천재_개발자':
          return '👨‍💻(천재개발자)'
        case '기쁨':
          return '😂'
        case 'kkkk':
          return 'ㅋㅋ'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
  .reaction {
    color: mediumseagreen;
    margin: 10px;
    padding: 10px;
    border-top: 3px dotted black;
  }

  .username {
    font-weight: bolder;
  }

  .emoji {
    margin: 5px;
  }

  .user-list {
    margin: 10px;
  }
</style>
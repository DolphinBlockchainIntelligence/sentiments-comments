<template>
  <div id="sentiments-comments">
    <ul class="comments">
        <li v-for="(comment, key) in comments" :class="'comment sentiment'+comment.Sentiment">
        <div class="heading">
          <div class="author">{{ comment.user }}:</div>
          <div class="date">{{ comment.date }}:</div>
        </div>
        <a :href="'https://bitcointalk.org/index.php?topic='+comment.topicId+'.msg'+key+'#msg'+key" target="_blank" class="text">{{ comment.text }}:</a>
      </li>
    </ul>
    <p align="center">
      <a class="waves-effect waves-light btn btn-show-all" @click.prevent="toShowAll($event)">Show all</a>
    </p>
  </div>
</template>


<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
const colors = ['#f98a83', '#989898', '#85f77e']
export default {
  name: "sentimentsComments",
  props: ['id'],
  data: function data() {
    return {
      // comments: [],
      commentsSource: [],
      showNumber: 30,
      showAll: false
    }
  },
  mounted () {
    this.loadComments()
  },
  computed: {
    comments () {
      var comments = this.commentsSource
      comments = _.orderBy(comments, ['date'], ['desc'])
      comments = _.forEach(comments, function(item, i) {
        item.date = moment(item.date).calendar()
      })
      if (!this.showAll) {
        // slice n elements from object
        const pick = (obj, keys) =>
          Object.keys(obj)
            .slice(0, keys)
            .reduce((acc, key) => {
              acc[key] = obj[key];
              return acc;
            }, {})
        comments = pick(comments, this.showNumber)
      }
      return comments
    }
  },
  methods: {
    loadComments: function () {
      const postId = this.$route.params.id
      axios.get('http://178.218.115.169:5000/btt-sentiments/D'+ postId +'.json')
      .then(response => {
        this.commentsSource = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    removeWidget: function () {
      this.$root.$emit('removeWidget', this.id)
    },
    toShowAll: function (event) {
      this.showAll = true
      event.currentTarget.classList.add('hide')
    }
  }
}
</script>


<style lang="sass">
html
  overflow-x: hidden !important
</style>

<style lang="sass" scoped>
html
  overflow-x: hidden
.hide
  display: none
.sentiment0 .text
  background: #f98a83
.sentiment1 .text
  background: #dddddd
.sentiment2 .text
  background: #85f77e
.comments
  list-style: none
  padding: 0
  margin: 0 7px
  overflow-x: hidden
  .comment
    margin-bottom: 14px
    overflow-x: hidden
    .heading
      display: flex
      justify-content: space-between
      color: #999
    .text
      padding: 7px 14px
      border-radius: 2px
      display: block
      color: #292b2c
      text-decoration: none
      cursor: pointer
      opacity: .8
      &:hover
        opacity: 1
</style>

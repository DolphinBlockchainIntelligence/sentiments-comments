import Vue from 'vue'
import Router from 'vue-router'
import SentimentsComments from '@/SentimentsComments'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/sentiments-comments/:id',
      name: 'SentimentsComments',
      component: SentimentsComments,
      props: true,
      meta: { reuse: false }
    }
  ]
})

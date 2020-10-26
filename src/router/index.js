import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUser } from '@/utils/storage.js'
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/views/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const Articles = () => import('@/views/articles/index.vue')
const Pictures = () => import('@/views/pictures/index.vue')
const Page404 = () => import('@/views/page404/index.vue')
const AddArticle = () => import('@/views/articles/add.vue')
const EditArticle = () => import('@/views/articles/edit.vue')
const Comment = () => import('@/views/comment')
const Fans = () => import('@/views/fans')
const Settings = () => import('@/views/settings')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/', component: Home },
        { path: '/articles', component: Articles },
        { path: '/add-article', component: AddArticle },
        { path: '/edit-article/:id', component: EditArticle },
        { path: '/pictures', component: Pictures },
        { path: '/comment', component: Comment },
        { path: '/fans', component: Fans },
        { path: '/settings', component: Settings }
      ]
    },
    { path: '/login', component: Login },
    { path: '*', component: Page404 }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const userInfo = getUser()
  if (to.path === '/login' || userInfo.token) {
    next()
  } else {
    next('/login')
  }
})

export default router

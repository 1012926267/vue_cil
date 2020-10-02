import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Register from "../components/Register";
import Course from "../components/Course";
import Student from "../components/Student";
import Teacher from "../components/Teacher";
import Date from "../components/Date";
import Lesson from "../components/Lesson";


Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: Login},
    {path: '/home', name: 'Home',component: Home, redirect: '/course',
      children:[
        {path:'/course',name:'course',component:Course},
        {path:'/lesson',name: 'lesson',component: Lesson},
        {path:'/student',name:'student',component:Student},
        {path:'/teacher',name:'teacher',component:Teacher},
        {path:'/date',name:'date',component:Date}
      ]
    },
    {path: '/register', name: 'Register', component: Register}

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login'){
    return next();
  }else if (to.path === '/register'){
    return next();
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr){
    alert('请先进行登陆')
    return next('/login')
  }else {
    next()
  }

})

export default router

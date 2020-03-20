import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const adminviews = [
  {
    path: '/teacherManage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/teacherManage'),
        name: 'teacherManage',
        meta: { title: '教师管理', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/studentManage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/studentManage'),
        name: 'studentManage',
        meta: { title: '学生管理', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/gradeManage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/gradeManage'),
        name: 'gradeManage',
        meta: { title: '成绩修改', icon: 'documentation', noCache: true }
      }
    ]
  }
]

const teacherviews = [
  {
    path: '/paperManage',
    component: Layout,
    redirect: '/paperManage',
    alwaysShow: true,
    name: 'paperManage',
    meta: { title: '试卷管理', icon: 'list', noCache: true },
    children: [
      {
        path: 'import',
        component: () => import('@/views/teacher/import'),
        name: 'import',
        meta: { title: '试卷导入' }
      },
      {
        path: 'paperManage',
        component: () => import('@/views/teacher/paperManage'),
        name: 'paperManage',
        meta: { title: '试题管理' }
      },
      {
        path: 'QuestionManage',
        component: () => import('@/views/teacher/QuestionManage'),
        name: 'QuestionManage',
        hidden: true,
        meta: { title: '试题管理' }
      }
    ]
  },
  {
    path: '/grade',
    component: Layout,
    children: [
      {
        path: 'rank',
        component: () => import('@/views/teacher/rank'),
        name: 'rank',
        meta: { title: '查看排名', icon: 'peoples', noCache: true }
      },
      {
        path: 'showRank',
        component: () => import('@/views/teacher/showRank'),
        name: 'showRank',
        hidden: true,
        meta: { title: '展示排名' }
      }
    ]
  },
  {
    path: '/userInfo',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher/personal'),
        name: 'userInfo',
        meta: { title: '信息维护', icon: 'user', noCache: true }
      }
    ]
  }
]

const studentrviews = [
  {
    path: '/student',
    component: Layout,
    meta: { icon: 'documentation', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/choose'),
        name: 'student',
        meta: { title: '开始考试', icon: 'edit', noCache: true }
      },
      {
        path: 'paper',
        component: () => import('@/views/student/paper'),
        name: 'Paper',
        hidden: true,
        meta: { title: '考试页面', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/grade',
    component: Layout,
    children: [
      {
        path: 'grade',
        component: () => import('@/views/student/grade'),
        name: 'grade',
        meta: { title: '查看成绩', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/wrongQuestion'),
        name: 'error',
        meta: { title: '查看错题', icon: 'eye-open', noCache: true }
      }
    ]
  },
  {
    path: '/userInfo',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/personal'),
        name: 'userInfo',
        meta: { title: '信息维护', icon: 'user', noCache: true }
      }
    ]
  }
]

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/studentRegister',
    component: () => import('@/views/student/studentRegister'),
    hidden: true
  },
  {
    path: '/teacherRegister',
    component: () => import('@/views/teacher/teacherRegister'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => {
  var userRole = sessionStorage.getItem('userRole')
  if (userRole) {
    console.log('改变页面!')
    console.log('页面长度为' + constantRoutes.length)
    constantRoutes.length = 8
    if (userRole === 'admin') {
      adminviews.forEach(item => {
        constantRoutes.push(item)
      })
    } else if (userRole === 'teacher') {
      teacherviews.forEach(item => {
        constantRoutes.push(item)
      })
    } else if (userRole === 'student') {
      studentrviews.forEach(item => {
        constantRoutes.push(item)
      })
    }
  }
  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
}
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

/*!
 * Router (Vue)
 * File: router/index.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import NotFound from '@/views/404.vue'
import Unauthorized from '@/views/401.vue'
import UsersRegister from '@/views/UsersRegisterView.vue'
import UsersList from '@/views/UsersListView.vue'
import {getMeta} from "@/services/meta.services"
import {authorizeNominator, authorizeAdmin, authorizeSuperAdmin, authenticate} from "@/services/auth.services"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: getMeta('Home'),
      beforeEnter: authorizeAdmin
    },
    {
      path: "/users",
      name: "users-list",
      component: UsersList,
      meta: getMeta('Manage Users'),
      beforeEnter: authorizeAdmin
    },
    {
      path: "/users/new",
      name: "users-register",
      component: UsersRegister,
      meta: getMeta('Nominator Registration'),
      beforeEnter: authorizeNominator
    },
    // {
    //   path: "/users/edit/:guid",
    //   name: "admin-user-edit",
    //   component: EditUser,
    //   meta: getMeta('Edit User Data'),
    //   beforeEnter: authorizeAdmin
    // },
    // {
    //   path: "/users/assign/:guid",
    //   name: "admin-user-assign",
    //   component: AssignUser,
    //   meta: getMeta('Assign User Role'),
    //   beforeEnter: authorizeSuperAdmin
    // },
    // {
    //   path: "/users/delete/:guid",
    //   name: "admin-user-delete",
    //   component: DeleteUser,
    //   meta: getMeta('Delete User'),
    //   beforeEnter: authorizeAdmin
    // },
    {
      path: '/401',
      name: 'unauthorized',
      component: Unauthorized,
      meta: getMeta('Unauthorized')
    },
    {
      path: '/:pathMatch(.*)*',
      name: "page-not-found",
      component: NotFound ,
      meta: getMeta('Page Not Found')
    }
  ]
})

// authenticate user on all routes
router.beforeEach(authenticate);

export default router

/*!
 * Router (Vue)
 * File: router/index.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

import { createRouter, createWebHistory } from 'vue-router';
import NominatorDashboard from '@/views/NominatorDashboardView.vue';
import AdminDashboard from '@/views/AdminDashboardView.vue';
import NotFound from '@/views/404View.vue';
import Unauthorized from '@/views/401View.vue';
import UsersRegister from '@/views/UsersRegisterView.vue';
import UsersList from '@/views/UsersListView.vue';
import NominationsManage from '@/views/NominationsManageView.vue';
import NominationCreate from '@/views/NominationCreateView.vue';
import NominationEdit from '@/views/NominationEditView.vue'
import {getMeta} from "@/services/meta.services";
import {authorizeAdmin, authorizeNominator, authenticate} from "@/services/auth.services";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve, _) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 100
          })
        }, 500)
      })
    }
    else if (savedPosition) {
      return savedPosition
    }
  },
  routes: [
    {
      path: "/",
      name: "admin-dashboard",
      component: AdminDashboard,
      meta: getMeta('Admin Dashboard'),
      beforeEnter: authorizeAdmin
    },
    {
      path: "/nominate",
      name: "nominator-dashboard",
      component: NominatorDashboard,
      meta: getMeta('Nominator Dashboard'),
      beforeEnter: authorizeNominator
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
      name: "users-create",
      component: UsersRegister,
      meta: getMeta('User Registration')
    },
    {
      path: "/users/register",
      name: "users-register",
      component: UsersRegister,
      meta: getMeta('Nominator Registration')
    },
    {
      path: "/nominations",
      name: "list-nominations",
      component: NominationsManage,
      meta: getMeta('Manage Nominations'),
      beforeEnter: authorizeAdmin
    },
    // {
    //   path: "/nominations/view/:id",
    //   name: "nomination-view",
    //   component: ViewNomination,
    //   meta: getMeta('View Nomination'),
    //   beforeEnter: authorizeNominator
    // },
    {
      path: "/nominations/create/:category",
      name: "create-nomination",
      component: NominationCreate,
      meta: getMeta('Create Nomination'),
      beforeEnter: authorizeNominator,
    },
    {
      path: "/nominations/edit/:category/:id",
      name: "edit-nomination",
      component: NominationEdit,
      meta: getMeta('Emerging Leader'),
      beforeEnter: authorizeNominator
    },
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

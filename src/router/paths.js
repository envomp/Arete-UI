/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import store from '../store'

export default [
    {
        path: '*',
        meta: {
            name: '',
            requiresAuth: true
        },
        redirect: {
            path: '/services/arete/dashboard'
        }
    },
    // This  allows you to have pages apart of the app but no rendered inside the dash
    {
        path: '/services/arete/',
        meta: {
            name: '',
            requiresAuth: false
        },
        component: () =>
            import(/* webpackChunkName: "routes" */ `@/views/LoginHome.vue`),
        // redirect if already signed in
        beforeEnter: (to, from, next) => {
            if (store.getters.authorized) {
                next('/services/arete/dashbaord')
            } else {
                next()
            }
        },
        children: [
            {
                path: '',
                component: () => import(`@/components/LoginForm.vue`)
            }
        ]
    },
    // add any extra routes that you want rendered in the dashboard as a child below. Change toolbar names here
    {
        path: '/services/arete/dashboard',
        meta: {
            name: 'Dashboard View',
            requiresAuth: true
        },
        component: () => import(`@/views/DashboardView.vue`),
        children: [
            {
                path: '',
                meta: {
                    name: 'Automated testing Service',
                    requiresAuth: true
                },
                component: () => import(`@/components/DashViews/Dashboard.vue`)
            },
            {
                path: '/services/arete/submissions',
                meta: {
                    name: 'Submission Overview',
                    requiresAuth: true
                },
                component: () => import(`@/components/DashViews/SubmissionTable.vue`)
            },
            {
                path: '/services/arete/courses',
                meta: {
                    name: 'Course Overview',
                    requiresAuth: true
                },
                component: () => import(`@/components/DashViews/CourseTable.vue`)
            },
            {
                path: '/services/arete/exercises',
                meta: {
                    name: 'Exercise Overview',
                    requiresAuth: true
                },
                component: () => import(`@/components/DashViews/ExerciseTable.vue`)
            },
            {
                path: '/services/arete/students',
                meta: {
                    name: 'Student Overview',
                    requiresAuth: true
                },
                component: () => import(`@/components/DashViews/StudentTable.vue`)
            },
            {
                path: '/services/arete/admin',
                meta: {
                    name: 'Admin Page',
                    requiresAuth: true
                },
                component: () => import(`@/components/DashViews/AdminView.vue`)
            }
        ]
    }
]

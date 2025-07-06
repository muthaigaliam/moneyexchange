import registrationVue from '@/modules/registration/patient-search/registration.vue';

export const AppRoute = {
  Unauthorize: {
    name: 'unauthorize',
    path: '/unauthorize'
  },
  Home: {
    name: 'home',
    path: '/'
  },
  Login: {
    name: 'login-form',
    path: '/'
  },
  OtpVerify: {
    name: 'otp-verify',
    path: '/otp-verify'
  },

  Registration: {
    name: 'registration',
    path: '/registration'
  },
  User: {
    name: 'user',
    path: '/user-management/users',
    addNew: {
      name: 'user-create',
      path: '/user-management/users/create'
    },
    details: {
      name: 'user-details',
      path: '/user-management/users/:id'
    },
    edit: {
      name: 'user-edit',
      path: '/user-management/users/:id/edit'
    }
  },
  Role: {
    name: 'role',
    path: '/user-management/roles',
    addNew: {
      name: 'role-create',
      path: '/user-management/roles/create'
    },
    details: {
      name: 'role-details',
      path: '/user-management/roles/:id'
    },
    edit: {
      name: 'role-edit',
      path: '/user-management/roles/:id/edit'
    }
  }
} as const;

let UserResource = ($resource) => {
  'ngInject';
  return $resource('/api/users/:id/:controller/:role', {
    id: '@id',
    role: '@role'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    generateGuestPassword: {
      method: 'PUT',
      params: {
        controller: 'temporary-password'
      }
    },
    recoveryPassword: {
      method: 'PUT',
      params: {
        controller: 'recovery-password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    setRole: {
      method: 'PUT',
      params: {
        controller: 'change-role'
      }
    }
  });
};

export default UserResource;


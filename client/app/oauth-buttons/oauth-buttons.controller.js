 const OauthButtonsController = ($window) => {
  'ngInject';
  let loginOauth = (provider) => {
    $window.location.href = '/auth/' + provider;
  };
};

 export default OauthButtonsController;
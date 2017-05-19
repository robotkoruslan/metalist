 class OauthButtonsController {

  constructor($window) {
     'ngInject';
    this.$window = $window;
    console.log('provider2');
   }


  loginOauth(provider) {
    console.log('provider', provider);
    this.$window.location.href = '/auth/' + provider;
  };
}

 export default OauthButtonsController;
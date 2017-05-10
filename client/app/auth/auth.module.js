import utilModule from '../util/util.module';

//import routerDecorator from './router.decorator';
import AuthService from './auth.service';
import authInterceptor from './interceptor.service';
import UserResource from './user.service';

let authModule = angular.module('metalistTicketsApp.auth', [
  utilModule
])
  .factory('User', UserResource)
  .factory('Auth', AuthService)
  .factory('authInterceptor', authInterceptor)
  .name;

export default authModule;
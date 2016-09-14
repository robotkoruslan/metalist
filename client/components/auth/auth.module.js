'use strict';

angular.module('metallistTicketsApp.auth', ['metallistTicketsApp.constants',
    'metallistTicketsApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

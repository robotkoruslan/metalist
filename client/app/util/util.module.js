import Util from './util.service'

let utilModule = angular.module('util', [])
  .factory('Util', Util)
  .name;

export default utilModule;
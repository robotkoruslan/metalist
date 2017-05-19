import template from './navbar.html';

const navbarDirective = () => {
  return {
    templateUrl: template,
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  }
};

export default navbarDirective;
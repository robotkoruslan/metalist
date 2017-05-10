import template from './navbar.html';

const navbarDirective = () => ({
        templateUrl: template,
        restrict: 'E',
        controller: 'NavbarController',
        controllerAs: 'nav'
    });

export default navbarDirective;
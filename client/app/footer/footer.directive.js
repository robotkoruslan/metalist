import template from './footer.html';

const footerDirective =  () => {
  return {
    templateUrl: template,
    restrict: 'E',
    link: function (scope, element) {
      element.addClass('footer');
    }
  };
};

export default footerDirective;
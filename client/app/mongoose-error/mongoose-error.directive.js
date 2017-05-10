/**
 * Removes server error when user updates input
 */

const mongooseErrorDirective = () => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.on('keydown', () => ngModel.$setValidity('mongoose', true));
            }
        };
    };

export default mongooseErrorDirective;

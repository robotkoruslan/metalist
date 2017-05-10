import template from './oauth-buttons.html';

const oauthButtonsDirective = () => {
        return {
            templateUrl: template,
            restrict: 'EA',
            controller: 'OauthButtonsController',
            controllerAs: 'OauthButtons',
            scope: {
                classes: '@'
            }
        };
    };

export default oauthButtonsDirective;
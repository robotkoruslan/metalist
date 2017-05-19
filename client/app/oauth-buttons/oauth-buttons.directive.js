import template from './oauth-buttons.html';
import OauthButtonsController from './oauth-buttons.controller';

const oauthButtonsDirective = () => {
        return {
            templateUrl: template,
            restrict: 'EA',
            controller: OauthButtonsController,
            controllerAs: 'OauthButtons',
            scope: {
                classes: '@'
            }
        };
    };

export default oauthButtonsDirective;
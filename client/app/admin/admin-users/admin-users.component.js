import template from './admin-users.html';

class AdminUsersController {

  constructor(User) {
    'ngInject';
    this.userService = User;
    this.users = [];
  }

  $onInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = this.userService.query();
  }

  setRole(user, role) {
    if (user.role != role) {
      this.userService.setRole({id: user.id, role: role})
        .$promise.then(() => this.getUsers());
    }
  }

}

let adminUsersComponent = {
  templateUrl: template,
  controller: AdminUsersController
};

export default adminUsersComponent;
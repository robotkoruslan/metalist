import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { UserService } from '../../services/user.service';
import {User} from '../../model/user.interface';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
@Pipe({
  name: 'filter',
})

export class MyFilterPipe implements PipeTransform {
  transform(users: any, filter: any): any {
    if (filter && Array.isArray(users)) {
        let filterKeys = Object.keys(filter);
        return users.filter(user =>
            filterKeys.reduce((memo, keyName) =>
                (memo && new RegExp(filter[keyName], 'gi').test(user[keyName])) || filter[keyName] === "", true));
    } else {
        return users;
    }
  }
}
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[];
  public filterText: string;
  public filterInput = new FormControl();
  public enableFilter: boolean;
  public filterPlaceholder: string;
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.filterText = "";
    this.enableFilter = true;
    this.filterPlaceholder = "Поиск пользователей";
    this.filterInput
    .valueChanges
    .debounceTime(200)
    .subscribe(users => {
      this.filterText = users;
      console.log(users);
    });
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  setRole(user, role) {
    if (user.role != role) {
      this.userService.setRole(user.id, role)
        .subscribe(
          () => this.getUsers(),
          err => console.log(err),
        );
    }
  }

}

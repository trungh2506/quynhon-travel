import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent {
    selectedUser: any;
    users: any[] = [];
    statuses!: any[];

    loading: boolean = true;

    constructor(private userService : UserService) {}

    ngOnInit() {
       this.getUsers();
    }
    getUsers(){
      this.userService.getUsers().subscribe(res => {
        this.users = res.users;
        console.log(this.users)
      })
    }
    getSeverity(role: boolean) {
      if(role){
        return 'danger';
      }else{
        return 'new';
      }
    }
    getRoleInfo(role: boolean){
      if(role){
        return 'admin';
      }else{
        return 'user';
      }
    }

}

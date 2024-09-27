import { Component } from '@angular/core';
import {GetService} from "../../services/get.service";


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  userId: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  readP: boolean = false;
  createP: boolean = false;
  updateP: boolean = false;
  deleteP: boolean = false;
  showDelete: boolean = false;
  showUpdate:boolean = false;
  message: string = "";
  allUsers: Array<any> = [];

  constructor(private getService : GetService) {
    this.getUsers();
    this.getPermission();
  }

  getUsers(){
    this.getService.getAllUsers().subscribe(res =>{

      for(let i = 0; i < res.body.length; i++){

        for(let j =0;j<res.body[i].permissions.length; j++)
        {

          if(res.body[i].permissions[j].name == "can_read_users"){this.readP = true;}
          if(res.body[i].permissions[j].name == "can_create_users") {this.createP = true;}
          if(res.body[i].permissions[j].name == "can_update_users"){this.updateP = true;}
          if(res.body[i].permissions[j].name == "can_delete_users"){this.deleteP = true;}
        }

        let user  ={
          userId : res.body[i].userId,
          firstName : res.body[i].name,
          lastName : res.body[i].last_name,
          email : res.body[i].email,
          readP : this.readP,
          createP : this.createP,
          updateP : this.updateP,
          deleteP : this.deleteP
        }


        this.allUsers.push(user);

        this.readP = false;
        this.createP = false;
        this.deleteP =false;
        this.updateP = false;

      }
      console.log(res.body);
    },
      error => {
        this.message = "You don't have permission to do this function";
      })
  }

  deleteUser(id:number){
    this.getService.deleteUser(id).subscribe(res=>{
      this.allUsers = [];
      this.getUsers();
    })
  }

  getPermission():void{
    this.showDelete = false;
    this.showUpdate = false;
    var value = JSON.parse(localStorage.getItem("permissions")!);
    if(value != null){
      for(let i=0; i < value.length; i++) {
        if(value[i].name == "can_delete_users") this.showDelete = true;
        if(value[i].name == "can_update_users") this.showUpdate = true;
      }
    }
  }

}

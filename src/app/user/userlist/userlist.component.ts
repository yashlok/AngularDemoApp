import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService  } from '../../services/user.service';
import { forkJoin } from 'rxjs';
 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-userlist',
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements  OnInit {
  user1: User[] = []
  user2: User[] = [];
  user3: User[] = [];
 users: User[] = [];
constructor(private api: UserService) {  
}

ngOnInit() {
  forkJoin([
    this.api.getUsers1(),
    this.api.getUsers2(),
    this.api.getUsers3()
  ]).subscribe({
    next: ([us1, us2, us3]) => {
        // this.user1 = us1;
        // this.user2 = us2;
        // this.user3 = us3;
       // Convert objects → arrays
        this.user1 = [us1];
         this.user2 = [us2];
         this.user3 = [us3];

      console.log("All API calls completed successfully");
      console.log("User 1:", this.user1);
      console.log("User 2:", this.user2);
      console.log("User 3:", this.user3);
      //this.users = [...us1, ...us2, ...us3];
      this.users = [us1, us2, us3];

      console.log("User 3:", this.users);
    
        
    },
    error: (err) => {
      console.error("At least one API failed: ", err);
    }
  });
}
}

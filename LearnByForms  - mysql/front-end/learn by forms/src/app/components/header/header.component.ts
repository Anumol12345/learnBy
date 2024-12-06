import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerserviceService } from 'src/app/services/server-service.service';
import { StateManagerService } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  LoginedUser: Boolean = false;
  displayname: any = '';
  name: any = '';
  profileImage: any;
  constructor(private router: Router, private serverService: ServerserviceService,
    private state: StateManagerService,) { 

    this.state.userName.subscribe((data) => {
      this.displayname = data;
      if (this.displayname) {
        this.LoginedUser = true;

        this.name = this.displayname;
        // if (localStorage.getItem('session.username')) {
        //   this.userName = JSON.parse(
        //     localStorage.getItem('session.username') || ''
        //   );

        //   console.log(this.userName);
        // } 
       
      } else {
        this.LoginedUser = false;
        
      }
    });
    this.state.userImg.subscribe((data) => {
        if(data){
         // if (localStorage.getItem('session.profileImage')) {
            this.profileImage = data;
            //console.log(this.profileImage);
          //}
        }
    })
    console.log(this.profileImage);
    if (localStorage.getItem('session.name')) {
      this.name= JSON.parse(localStorage.getItem('session.name') || '');
      this.state.publishUsername(this.name);
    }
    if (localStorage.getItem('session.profileImage')) {
      this.profileImage = JSON.parse(localStorage.getItem('session.profileImage') || '');
      this.state.publishUserimg(this.profileImage);
      console.log(this.profileImage);
    }
    else{
      console.log(this.profileImage);
    }
  }

  ngOnInit(): void {
  }
 
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  Logout(){
    this.serverService
    .PostService("/api/login/logout" ,null)
    .subscribe((data) => {

     console.log(data);
     if(data.error){
        console.log("error");
        
        return;
     }
    
     this.LoginedUser = false;
        this.displayname = null;
        this.profileImage =null;
        this.state.publishUsername(null);
        this.state.publishUserimg(null);
        localStorage.clear();
        this.router.navigateByUrl('/login');
   },
   (error) => {
     console.log(error);
   }
   );
  }
}

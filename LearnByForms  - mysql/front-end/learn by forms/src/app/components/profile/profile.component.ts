import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServerserviceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  name: any;
  profileData:any;
  imgurl: any;
  userId: any;
  profilelinks: any;
  showLinks: boolean = false;
  showProjs: boolean=false;
  showCollabs: boolean=false;
  constructor( private serverService: ServerserviceService, ) {
    
   }

  ngOnInit(): void {
   
    this.LoadProfile();
  }
  LoadProfile(){
    this.serverService
    .PostService("/api/login/profile"  ,null)
    .subscribe((data) => {
      console.log(data);
      if(data){
        if(data.error == "TokenExpired"){
          this.serverService.PostService("/api/login/refreshToken"  ,null)
           .subscribe((data) => {
           console.log(data);
           if(data.refreshToken){
             localStorage.setItem("session.key", JSON.stringify(data.refreshToken));
             this.LoadProfile();
           }
          })
          return;
        }
        if(data.profile.length != 0){
          this.profileData = data.profile[0];
          console.log(this.profileData);
          if(this.profileData){
            this.name = this.profileData.name;
          }

          this.showLinks= this.profileData.setlink === true ? true : false ;
          this.showProjs= this.profileData.setproj === true ? true : false ;
          this.showCollabs= this.profileData.setcollab === true ? true : false ;
        }
      
        if(data.profile.length == 0){
          if (localStorage.getItem('session.name')) {
            this.name = JSON.parse(
              localStorage.getItem('session.name') || ''
            );
            console.log( this.name);
            
          }
          if (localStorage.getItem('session.userid')) {
            this.userId = JSON.parse(
              localStorage.getItem('session.userid') || ''
            );
          }
        }

      }
      
      //console.log(this.profileData)
      

      
    });
  }

}

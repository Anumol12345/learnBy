import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerserviceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId: any;
  userName: any;
  name:any;
  profileData: any;
  review_id: any;
// colors :any =[
//  "#80ccff" ,"" ,"" ,"" ,"" ,
// ]
  constructor(  private activatedRoute: ActivatedRoute,
    private serverService: ServerserviceService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.review_id = params['Id'];
    });
  }

  ngOnInit(): void {
   if(this.review_id){
    this.LoadProfile();
   }
    else{
      this.LoadProfileLogin();
    }
  }
  LoadProfileLogin(){
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
          this.name = this.profileData.name

        }
       
        // if(data.links.length != 0){
        //   this.profilelinks= data.links[0].links;
        // }
         if(data.profile.length == 0){
           if (localStorage.getItem('session.name')) {
             this.name = JSON.parse(
               localStorage.getItem('session.name') || ''
             );
           }
        //   if (localStorage.getItem('session.userid')) {
        //     this.userId = JSON.parse(
        //       localStorage.getItem('session.userid') || ''
        //     );
        //   }
         }
       // console.log(this.profileData);
        //this.userName = this.profileData.name;
      

      }
      
      //console.log(this.profileData)
      

      
    });
  }
  LoadProfile(){
    let obj ={id: this.review_id}
    this.serverService
    .PostService("/api/home/reviewdata"  ,obj)
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
          this.name = this.profileData.name

        }
       
        // if(data.links.length != 0){
        //   this.profilelinks= data.links[0].links;
        // }
        // if(data.profile.length == 0){
        //   if (localStorage.getItem('session.username')) {
        //     this.userName = JSON.parse(
        //       localStorage.getItem('session.username') || ''
        //     );
        //   }
        //   if (localStorage.getItem('session.userid')) {
        //     this.userId = JSON.parse(
        //       localStorage.getItem('session.userid') || ''
        //     );
        //   }
        // }
       // console.log(this.profileData);
        //this.userName = this.profileData.name;
      
      }
      

      
    });
  }
}

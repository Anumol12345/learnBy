import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ServerserviceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  userName: any;
  profileData:any=[];
  imgurl: any;
  userId: any;
  review_id: any;
  profilelinks: any=[];
  constructor(  private activatedRoute: ActivatedRoute,
    private serverService: ServerserviceService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.review_id = params['Id'];
    });
  }
  ngOnInit(): void {
   
    this.LoadProfile();
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
          if(this.profileData){
            this.userName = this.profileData.name;
          }
        }
       
        if(data.links.length != 0){
          this.profilelinks= data.links[0].links;
        }
        if(data.profile.length == 0){
          if (localStorage.getItem('session.username')) {
            this.userName = JSON.parse(
              localStorage.getItem('session.username') || ''
            );
          }
          if (localStorage.getItem('session.userid')) {
            this.userId = JSON.parse(
              localStorage.getItem('session.userid') || ''
            );
          }
        }
       // console.log(this.profileData);
        //this.userName = this.profileData.name;
      
      }
      

      
    });
  }
}

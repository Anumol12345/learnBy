import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerserviceService } from 'src/app/services/server-service.service';
import { StateManagerService } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errorMsgFlag:any=false;
  errorMsg: any;
  SinupForm: FormGroup;
  submitted: Boolean = false;
  Code:any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private serverService: ServerserviceService,
    private state: StateManagerService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.SinupForm = this.fb.group({
      userid: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.Code = params['code'];
    });
    let Codedata={
      Code :this.Code
    }
    if(this.Code){
      this.serverService
      .PostService("/api/login/callback"  ,Codedata )
      .subscribe((data) => {

        if(data.error){
          console.log("error");
          this.errorMsgFlag = true;
          this.errorMsg  = data.error;

          return;
       }
      
       let name = data.name;
       let userId = data.userid;
       let sessionKey =data.sessionkey;
       let profileImage = data.profileImage
        
       localStorage.setItem("session.key", JSON.stringify(sessionKey));
       localStorage.setItem("session.userid", JSON.stringify(userId));
       localStorage.setItem("session.name", JSON.stringify(name));
       this.state.publishUsername(name);
          if(profileImage ){
            localStorage.setItem("session.profileImage", JSON.stringify(profileImage));
            this.state.publishUserimg(profileImage);
          }
       this.router.navigateByUrl("dashboard");
     },
     (error) => {
       this.errorMsgFlag = true;
          this.errorMsg  ="Http error occured please try again";
     }
     );
      
    }
  }
  SignUpGoogle(){
    this.serverService
         .PostService("/api/login/auth" ,null)
         .subscribe((data) => {

          console.log(data);
          if(data.error){
            console.log("error");
            this.errorMsgFlag = true;
            this.errorMsg  = data.error;

            return;
         }
          window.open(data.url ,'_Self')
         },
         (error) => {
          this.errorMsgFlag = true;
             this.errorMsg  ="Http error occured please try again";
        });
  }
  get f() {
    return this.SinupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.SinupForm.invalid) {
      return;
    }
    console.log(this.SinupForm.value);
        this.serverService
        .PostService("/api/login/register" , this.SinupForm.value)
        .subscribe((data) => {
         console.log(data);
         if(data.error){
          console.log("error");
          this.errorMsgFlag = true;
          this.errorMsg  = data.error;
          return;
       }
       let name = data.name;
      let userId = data.userid;
      let sessionKey =data.sessionkey;
      let profileImage = data.profileImage
       
      localStorage.setItem("session.key", JSON.stringify(sessionKey));
      localStorage.setItem("session.userid", JSON.stringify(userId));
      localStorage.setItem("session.name", JSON.stringify(name));
      this.state.publishUsername(name);
          if(profileImage ){
            localStorage.setItem("session.profileImage", JSON.stringify(profileImage));
            this.state.publishUserimg(profileImage);
          }
      this.router.navigateByUrl("dashboard");
       },
       (error) => {
        this.errorMsgFlag = true;
           this.errorMsg  ="Http error occured please try again";
      });
  }

}

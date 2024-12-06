import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerserviceService } from 'src/app/services/server-service.service';
import { StateManagerService } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: Boolean = false;
  errorMsgFlag:any=false;
  errorMsg: any;
  Code:any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private serverService: ServerserviceService,
    private state: StateManagerService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
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
      
     this.router.navigateByUrl("home");
     },
     (error) => {
       this.errorMsgFlag = true;
          this.errorMsg  ="Http error occured please try again";
     }
     );
      
    }
  }
  get f() {
    return this.loginForm.controls;
  }
  SignWithGoogle(){
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
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.serverService
         .PostService("/api/login" , this.loginForm.value )
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
          this.router.navigateByUrl("home");
        },
        (error) => {
          this.errorMsgFlag = true;
             this.errorMsg  ="Http error occured please try again";
        }
        );
  }

}

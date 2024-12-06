import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerserviceService } from 'src/app/services/server-service.service';
import {  DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { StateManagerService } from 'src/app/services/state-manager.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  EditForm: FormGroup;
  submitted: Boolean = false;
  uploadFlag: boolean=false;
  userId: any;
  editData:any;
  name: any;
  selectedFile: any;
  image:any;
 // imgUrl: any;
  //imgurl?: SafeUrl;
  //imagePath: any;
  //url: any
  LinksArray:any=[];
  ProjArray:any=[];
 CollabArray:any=[];
  errorMsg: any;
  errorMsgFlag: boolean =false;
  showLinks:boolean = false;
  showProjs:boolean = false;
  showCollabs:boolean = false;
  itemData:any;



  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer,private http: HttpClient,
    private state: StateManagerService,private serverService: ServerserviceService,private router: Router,) {
    this.EditForm = this.fb.group({
      uploadedImage:[""],
      email: ["" , [Validators.required, Validators.email]],
      name: ["", Validators.required],
      username: ["", Validators.required],
      location: [""],
      profDesc:[""],
      roles: [""],
      setlink:[""],
      link :[''],
      linkdesc :[""],
      setproj :[""],
      title :[''],
      goal :[""],
      pot :[""],
      setcollab:[""],
      collabtitle:[''],
      collabdesc:[""],
      about: [""],
      
    });

    
   }
  

  ngOnInit(): void {
    this.LoadProfile();
    this.itemData = new FormData();
  }

  LoadProfile(){
    if (localStorage.getItem('session.userid')) {
      this.userId = JSON.parse(
        localStorage.getItem('session.userid') || ''
      );
    }
    if (localStorage.getItem('session.name')) {
      this.name = JSON.parse(
        localStorage.getItem('session.name') || ''
      );
    }
 

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
          this.editData =data.profile[0];
          this.image = this.editData.image;
          //this.EditForm.value.setlink =  false;
          this.EditForm.patchValue({
            uploadedImage :this.image,
            email:this.editData.email,
            name:this.editData.name,
            username:this.editData.username,
            profDesc : this.editData.profileDesc,
            location:this.editData.location,
            roles:this.editData.role,
            about:this.editData.about,
            setlink:this.editData.setlink,
            setproj :this.editData.setproj ,
            setcollab:this.editData.setcollab,
            // setlink:(this.editData.setlink === 'true'),
            // setproj :(this.editData.setproj === 'true'),
            // setcollab:(this.editData.setcollab=== 'true'),
          })
          this.showLinks= this.editData.setlink === true ? true : false ;
          this.showProjs= this.editData.setproj === true ? true : false ;
          this.showCollabs= this.editData.setcollab === true ? true : false ;
         
          
         //console.log(this.EditForm.value.setcollab);
          this.LinksArray  =this.editData.links
          this.ProjArray=this.editData.projects
          this.CollabArray=this.editData.Collabs
        }
        
        
        if(data.profile.length == 0){
          this.EditForm.patchValue({
            email : this.userId,
            name: this.name
        })
        }
        
      }
    });
  }
  onFileChange(event: any) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);

      this.EditForm.patchValue({ uploadedImage: file });
      this.EditForm.get('uploadedImage')?.updateValueAndValidity();

      this.itemData = new FormData();
      this.itemData.append('file' , file);
  

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result; 
       console.log(this.image);
      };

     
   

    }
    this.uploadFlag = true;
  
  }
  get f() {
    return this.EditForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    //this.errorMsgFlag = false;
    if (this.EditForm.invalid) {
      return;
    }
    let dataArr = [this.LinksArray , this.ProjArray ,this.CollabArray];
   
   console.log(this.EditForm.value.uploadedImage);

 
   
    this.itemData.append('formvalues',JSON.stringify(this.EditForm.value));
    this.itemData.append('dataArr', JSON.stringify(dataArr));
    //this.itemData.append('userid', JSON.parse(localStorage.getItem('session.userid') || ''));
    this.itemData.append('sessionkey',JSON.parse(localStorage.getItem('session.key') || ''));

    //    this.http.post<any>('http://localhost:3080/api/login/addProfile', this.itemData).subscribe(
    //    (res) => console.log(res),
    //    (err) => console.log(err)
    //  );
     this.serverService.EditService("/api/login/addProfile"  ,this.itemData)
     .subscribe((data) => {
      console.log(data);
      this.itemData = new FormData();
      if(data){
        if(data.Usererror){
          this.errorMsg = data.Usererror;
          this.errorMsgFlag =true;
          return;
        }
        if(data.error == "TokenExpired"){
          this.serverService.PostService("/api/login/refreshToken"  ,null)
           .subscribe((data) => {
           console.log(data);
           if(data.refreshToken){
             localStorage.setItem("session.key", JSON.stringify(data.refreshToken));
             this.onSubmit();
           }
          })
          return;
        }

        this.router.navigateByUrl("profile");
        let username = data.name;
        let profile_image = data.image;
  
        localStorage.setItem("session.profileImage", JSON.stringify(profile_image));
        localStorage.setItem("session.username", JSON.stringify(username));
  
        this.state.publishUserimg(profile_image);
        this.state.publishUsername(username);
      }
    });
    
      
      

   
  }

  IsCheckedCheck(event:any , id:any){
    if(id == 1){
      if(event.target.checked){
        this.showLinks = true;
      }
      else{
        this.showLinks = false;
      }
    }
    else if(id == 2){
      if(event.target.checked){
        this.showProjs = true;
      }
      else{
        this.showProjs = false;
      }
    }
    else if(id == 3){
      if(event.target.checked){
        this.showCollabs = true;
      }
      else{
        this.showCollabs = false;
      }
    }
    console.log(event.target.checked);


    
  }
  AddLinks(){
   // console.log(this.EditForm.value)
     console.log(this.EditForm.value.link);
     if(this.EditForm.value.link && this.EditForm.value.linkdesc){
      this.LinksArray.push({link:this.EditForm.value.link , desc : this.EditForm.value.linkdesc} );
     }
     
     //this.LinksArray.link = this.EditForm.value.link
     console.log(this.LinksArray);
     
     this.EditForm.patchValue( {'link':null , 'linkdesc':null} );
     
  }
  RemoveLinks(desc:any){
    console.log(this.LinksArray);
    this.LinksArray.forEach((element:any) => {
      if(element.desc == desc){
        console.log(this.LinksArray.indexOf(element));
        this.LinksArray.splice(this.LinksArray.indexOf(element), 1);
      }
    });
   // 
    console.log(desc);
    
    
   
  }
  AddProjs(){
    if(this.EditForm.value.title ){
      this.ProjArray.push({title:this.EditForm.value.title , goal : this.EditForm.value.goal , pot:this.EditForm.value.pot} );
     }
     
     //this.LinksArray.link = this.EditForm.value.link
     console.log(this.ProjArray);
     
     this.EditForm.patchValue( {'title':null , 'goal':null , 'pot':null} );
  }
  RemoveProj(title:any){
    console.log(this.LinksArray);
    this.ProjArray.forEach((element:any) => {
      if(element.title == title){
        console.log(this.ProjArray.indexOf(element));
        this.ProjArray.splice(this.ProjArray.indexOf(element), 1);
      }
    });
  }

  AddCollab(){
    if(this.EditForm.value.collabtitle ){
      this.CollabArray.push({title:this.EditForm.value.collabtitle , desc : this.EditForm.value.collabdesc} );
     }
     
     //this.LinksArray.link = this.EditForm.value.link
     console.log(this.CollabArray);
     
     this.EditForm.patchValue( {'collabtitle':null , 'collabdesc':null , } );
  }
  RemoveCollab(title:any){
    console.log(this.CollabArray);
    this.CollabArray.forEach((element:any) => {
      if(element.title == title){
        console.log(this.CollabArray.indexOf(element));
        this.CollabArray.splice(this.CollabArray.indexOf(element), 1);
      }
    });
  }
}

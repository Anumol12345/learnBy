import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerserviceService } from 'src/app/services/server-service.service';
import { NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
Home_data :any=[];
carousel_data:any =[];
disableBtn:any = false;
GroupData:any =[];
  Review_data: any=[];
  constructor(private serverService: ServerserviceService,
    private router: Router,config: NgbCarouselConfig ,private sanitizer : DomSanitizer) { 
    config.interval = 0;
    config.keyboard = true;
   
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
         
    this.serverService
         .PostService("/api/home" ,null)
         .subscribe((data) => {
          console.log(data);
          this.Home_data=data;
        });
        this.serverService
        .PostService("/api/home/home_data" ,null)
        .subscribe((data) => {
         console.log(data);
         this.carousel_data=data;

         var j = -1;
         this.carousel_data.forEach((element:any ,index:any) => {
           
           if(index % 6 == 0){
            j++;
            this.GroupData[j] =[];
            this.GroupData[j].push(element);
           }
           else{
            this.GroupData[j].push(element);
           }
          let iconStyle:any =document.getElementsByClassName('carousel-control-prev') ;
           iconStyle[0].classList.add('controlDis')
     
         });
         if(this.carousel_data.length < 7){
          let iconStyle:any =document.getElementsByClassName('carousel-control-next') ;
          iconStyle[0].classList.add('controlDis')
         }
       });
       this.serverService
       .PostService("/api/home/review_data" ,null)
       .subscribe((data) => {
        console.log(data);
        this.Review_data=data;
      });
       }
 getSanitizedURL(url:any):SafeUrl  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onSlideChanged(slideEvent: NgbSlideEvent) {
    let iconPrev:any =document.getElementsByClassName('carousel-control-prev') ;
    let iconNext:any =document.getElementsByClassName('carousel-control-next') ;
    console.log(slideEvent);
    const slideIndex = parseInt(slideEvent.current.replace("slideId_", ""), 10);
    console.log(slideIndex);
    if(slideEvent.current == "slideId_0"){
      setTimeout(function(){
        iconPrev[0].classList.add('controlDis');
        iconNext[0].classList.remove('controlDis');
      }, 1300);
    }
    else if(slideIndex+1 == this.GroupData.length){
      setTimeout(function(){
        iconNext[0].classList.add('controlDis');
        iconPrev[0].classList.remove('controlDis');
      }, 1300);
      
    }
    else{
      setTimeout(function(){
        iconPrev[0].classList.remove('controlDis');
        iconNext[0].classList.remove('controlDis');
      }, 1300);
      
    }
    
    
  }
  ReviewPage(id:any , name:any){
    this.router.navigate(["dashboard" ,name], {
      queryParams: {Id:id},
    }); 
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as cf from '../utils/commonfs';
import { StateManagerService } from './state-manager.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServerserviceService {

  
  constructor(private http: HttpClient ,private state: StateManagerService,
    private router: Router) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

//   // public PostService(id:any , inp0: Object, ): Observable<any> {
//   //   console.log(id);
//   //    console.log(inp0);
//   //    return this.http.post(id, inp0)
  
//   // }
//   public GetService(id:any): Observable<any> {
   
//     return this.http.get(id)
 
//  }
 public PostService(
  id: string,
  inp0: any,
  // inp1: any,
  // inp2: any,
  // inp3: any,
): Observable<any> {
  var reqObject:object = cf.buildReqJson(id, inp0);
  var reqJson = JSON.stringify(reqObject);
  console.log(reqJson);
  return this.http.post(id, reqJson , this.httpOptions);
}
public EditService(
  id: string,
  inp0: any,
): Observable<any> {

  return this.http.post(id, inp0 );
}
public LogoutService() {
  //this.LoginedUser = false;
  // this.displayname = null;
  this.state.publishUsername(null);
  localStorage.clear();
  this.router.navigate(['login']);
}

}

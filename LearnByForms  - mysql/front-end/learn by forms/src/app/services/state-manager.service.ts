import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StateManagerService {
  public userName = new BehaviorSubject<string>('');
  public userImg = new BehaviorSubject<string>('');
  constructor() { }
  public publishUsername(data: any) {
    this.userName.next(data);
  }

  public publishUserimg(data: any) {
    this.userImg.next(data);
  }
}

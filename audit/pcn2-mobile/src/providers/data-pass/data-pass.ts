import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

/*
  Generated class for the DataPassProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataPassProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataPassProvider Provider');
  }
  subscription: Subscription;

  private passCommunityId: any = new BehaviorSubject<string>(null);
  currentCommunityId: any = this.passCommunityId.asObservable();

  private passMemberId: any = new BehaviorSubject<string>(null);
  currentMemberId: any = this.passMemberId.asObservable();


  private passIdEvent: any = new BehaviorSubject<string>(null);
  currentpassIdEvent: any = this.passIdEvent.asObservable();

  private passEventObject: any = new BehaviorSubject<Object>(null);
  currentpassEventObject: any = this.passEventObject.asObservable();

  PassCommunityId(query: any) {
    this.passCommunityId.next(query);
  }

  PassMemberId(query: any) {
    this.passMemberId.next(query);
  }

  PassIdEvent(query: any) {
    this.passIdEvent.next(query);
  }


  PassEventObject(query: any) {
    this.passEventObject.next(query);
  }

}

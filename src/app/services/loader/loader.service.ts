import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  loading: BehaviorSubject<boolean> = new BehaviorSubject(false)
  waiting = false


  constructor() { }


  startLoading(inPage=false){
    if(this.waiting) return
    if(!inPage)return  this.loading.next(true)
  }
  endLoading(inPage=false){
    if(this.waiting) return
    if(!inPage) return this.loading.next(false)
  }

  getLoad():Observable<boolean>{
    return this.loading.asObservable()
  }


}

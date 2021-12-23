import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(){}

  loading: BehaviorSubject<boolean> = new BehaviorSubject(false)
  waiting = false
  inPageLoad = false

  startLoading(inPage=false){
    if(this.waiting || this.inPageLoad) return
    if(!inPage)return  this.loading.next(true)
  }
  endLoading(inPage=false){
    if(this.waiting || this.inPageLoad) return
    if(!inPage) return this.loading.next(false)
  }

  get getLoad():Observable<boolean>{
    return this.loading.asObservable()
  }


}

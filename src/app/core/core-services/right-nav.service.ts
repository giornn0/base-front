import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RightNavService{
    aside: BehaviorSubject<boolean> = new BehaviorSubject(false)
    
    toogle(value){
        this.aside.next(value)
    }

    get getAside():Observable<boolean>{
        return this.aside.asObservable()
    }
}
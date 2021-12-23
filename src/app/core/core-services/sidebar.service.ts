import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class SidebarService{
    sidebar:BehaviorSubject<boolean> = new BehaviorSubject(true)
    toogle(value){
        this.sidebar.next(value)
    }
    get getSidebar():Observable<boolean>{
        return this.sidebar.asObservable()
    }

}
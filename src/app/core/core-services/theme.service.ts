import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"

@Injectable(
    {
        providedIn:'root'
    }
)
export class ThemeService{
    theme:BehaviorSubject<string> = new BehaviorSubject('dark')
    themeBody:BehaviorSubject<string> = new BehaviorSubject('dark')

    changeTheme(value){
        this.theme.next(value)
    }
    changeBodyTheme(value){
        this.themeBody.next(value)
    }
   get  getTheme():Observable<string>{
        return this.theme.asObservable()
    }
   get  getThemeBody():Observable<string>{
        return this.themeBody.asObservable()
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false)

	show(inPage=false): void {
    if(!inPage)this.isLoading$.next(true);
	}
	hide(inPage=false): void {
    if(!inPage)this.isLoading$.next(false);
	}

	get isLoading(): Observable<boolean> {
		return this.isLoading$.asObservable();
	}


}

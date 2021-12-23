import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class RelatedSubscriptionsService{
  storage  =  localStorage.getItem('pac_rel')
  pacientes:BehaviorSubject<string[]> =  new BehaviorSubject(this.storage?this.storage.split(','):[])
  
  setPacientesIds(value:[]){
    this.pacientes.next(value)
  }

  pushValue(value,section:string){
    if(section==="pacientes"){this.pacientes.next([...this.pacientes.value,value]);localStorage.setItem('pac_rel',[...this.pacientes.value,value].join(','))}
  }
  eraseValue(value,section:string){
    if(section==="pacientes"){
      const valor = [...this.pacientes.value].filter(id=>id!=value)
      this.pacientes.next(valor);
      localStorage.setItem('pac_rel',valor.join(','))
    }
  }

  get pacientesIds():Observable<string[]>{
    return this.pacientes.asObservable()
  }

}
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["../../app.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private fBuilder: FormBuilder) {}

  test:string[]=['asasdas','qwegqwe','g4q3','12125315']

  condIvas: string[] = ['asdas','asdwaw','asdwasd']

  obrasSociales: {}[]= [
    {
      nombre:'primera',
      id:1
    },
    {
      nombre:'segunda',
      id:2
    },
    {
      nombre:'tercera',
      id:3
    },
    {
      nombre:'quitna',
      id:4
    },
    {
      nombre:'cuarta',
      id:5
    },
  ]

  autorizacionForm: FormGroup = this.fBuilder.group({
    codigo: [""],
    titulo:[""],
    num_tabla_asociada:[""],
    nombre:[""],
    obra_social:[0,[Validators.required,Validators.min(1)]],
    estado:[""],
  });
  prestacionForm:FormGroup = this.fBuilder.group({})

  ngOnInit() {
  }

  isTouched(field: string): boolean {
    return !!(
      this.autorizacionForm.controls[field].touched
    );
  }
  isInvalid(field: string): boolean {
    return !!(
      this.autorizacionForm.controls[field].touched &&
      this.autorizacionForm.controls[field].invalid
    );
  }

  submit(){

  }

}

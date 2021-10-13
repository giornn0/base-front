import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { RootService } from '../../services/http/root.service';
import { MaskedDate } from '../../shared/functions/mask.date';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class RootFormComponent implements OnInit {

  dateMask = MaskedDate

  @Input()section = ''
  @Input()camps = []
  @Input()forEdit = null
  @Input()title = ''


  @Input()template =  []
  @Input()validation = {}


  constructor(private rootService:RootService,private router: Router, private fBuilder: FormBuilder) { }


  submitted = {}
  form : FormGroup = this.fBuilder.group({})

  ngOnInit(): void {
    this.camps.forEach(key=>{
      this.form.addControl(key,this.fBuilder.control(this.validation[key][0],this.validation[key][1]))
    })
    if(this.forEdit){
      this.submitted = this.forEdit
      this.form.reset(this.forEdit)
    }
    this.form.valueChanges.subscribe(form=>{
      this.submitted = form
    })
  }

  isTouched(field: string): boolean {
    return !!this.form.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.form.controls[field].touched &&
      this.form.controls[field].invalid
    );
  }


  addFocusInput(campo: string) {
    document.getElementById(campo).focus();
  }

  submit() {
    console.log(this.submitted)
    // if (this.form.valid) {
    //   if (this.forEdit) {
    //     this.rootService
    //       .update(this.section,this.submitted, this.form.controls["id"].value)
    //       .subscribe((res) => {this.router.navigate([`${this.section}/listar`]);console.log(res)});
    //   } else {
    //     this.rootService
    //       .create(this.section,this.submitted)
    //       .subscribe((res) => {this.router.navigate([`${this.section}/listar`]);console.log(res)});
    //   }
    // } else {
    //   this.form.markAllAsTouched();
    //   this.camps.some((campo) => {
    //     if (this.form.controls[campo].invalid) {
    //       this.addFocusInput(campo);
    //       return true;
    //     }
    //   });
    // }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../services/http/root.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class FormComponent implements OnInit {

  title=''
  campos: string[] = [
    'name',
    'last_name',
    'email',
    'password',
    'role'
  ]

  roles=[{value:'admin',name:'Administrador'},{value:'user',name:'Usuario'}]

  isEdit=false

  constructor( private rootService: RootService,private activatedRoute: ActivatedRoute, private fBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data:any)=>{
      this.title = data.title
      if(data.user){
        this.isEdit = true
        console.log(data.user)
        this.userForm.controls['id'].setValue(data.user.id)
        this.userForm.controls['name'].setValue(data.user.name.split(',')[0])
        this.userForm.controls['last_name'].setValue(data.user.name.split(',')[1]? data.user.name.split(',')[1] : '')
        this.userForm.controls['email'].setValue(data.user.email)
        this.userForm.controls['role'].setValue(data.user.role && data.user.role.length ? data.user.role : null)
        this.userForm.controls['password'].setValue(data.user.password)
        this.userForm.controls['password'].disable()
      }
    })
    this.userForm.valueChanges.subscribe(form=>{
      this.userSubmitted ={
        name: form.name + ', '+form.last_name,
        email:form.email,
        password:form.password,
        role:form.role,        
      }
    })
  }

  userSubmitted : User = {} as User;
  userForm:FormGroup = this.fBuilder.group({
    id:'',
    name: [null,[Validators.required,]],
    last_name: [null,[Validators.required,]],
    email: [null,[Validators.required,Validators.email]],
    password: [null,[Validators.required,]],
    role:[null,[Validators.required]]
  }
  )

  isTouched(field: string): boolean {
    return !!this.userForm.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.userForm.controls[field].touched &&
      this.userForm.controls[field].invalid
    );
  }

  addFocusInput(campo: string) {
    document.getElementById(campo).focus();
  }

  submit() {
    if (this.userForm.valid) {
      if (this.isEdit) {
        this.rootService
          .update('users',this.userSubmitted, this.userForm.controls["id"].value)
          .subscribe((res) => {this.router.navigate(['usuarios/listar']);console.log(res)});
      } else {
        this.rootService
          .create('users',this.userSubmitted)
          .subscribe((res) => {this.router.navigate(['usuarios/listar']);console.log(res)});
      }
    } else {
      this.userForm.markAllAsTouched();
      this.campos.some((campo) => {
        if (this.userForm.controls[campo].invalid) {
          this.addFocusInput(campo);
          return true;
        }
      });
    }
  }

}

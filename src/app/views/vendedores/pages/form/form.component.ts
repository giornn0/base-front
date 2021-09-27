import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedoresService } from '../../../../services/http/vendedores/vendedores.service';
import { Vendedor } from '../../../../shared/models/vendedor.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ["../../../../app.component.css"],
})
export class FormComponent implements OnInit {

  submittedVendedor: Vendedor= {} as Vendedor;
  isEdit = false;
  campos: string[] = [
    'name',
    'last_name',
    'numero_documento'
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private vendedoresService: VendedoresService,
    private fBuilder: FormBuilder,
    private router: Router, private sanitizer: DomSanitizer
  ) { }

  vendedorForm: FormGroup = this.fBuilder.group({
    name:[null,[Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
    last_name:[null,[Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
    numero_documento:[null,[ Validators.pattern(/^[0-9]{6,10}$/)]],
  })

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data=>{
      console.log(data.vendedor)
      if(data.vendedor){
        this.isEdit = true
        this.submittedVendedor =data.vendedor.data[0]
        this.vendedorForm.setValue(data.vendedor.data[0])
      }
    })
    this.vendedorForm.valueChanges.subscribe(form=> {this.submittedVendedor = form;console.log(form)})
  }

  isTouched(field: string): boolean {
    return !!this.vendedorForm.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.vendedorForm.controls[field].touched &&
      this.vendedorForm.controls[field].invalid
    );
  }

  addFocusInput(campo: string) {
    document.getElementById(campo).focus();
  }


  cleanBlob(){
    this.blob = new Blob()
    this.pictureURL = ''
  }

  pictureURL:SafeResourceUrl=''
  blob : Blob = new Blob()
  focusing=false

  upload(file){
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.blob = new Blob(file.target.files, {
        type: file.target.files[0].type,
      });
      this.submittedVendedor.type_picture =file.target.files[0].type 
      const source = window.URL.createObjectURL(this.blob);
      this.pictureURL = this.sanitizer.bypassSecurityTrustUrl(source);
      console.log(this.blob)
    };
    reader.readAsArrayBuffer(file.target.files[0]);
  }

  submit() {
    if (this.vendedorForm.valid) {
      if (this.isEdit) {
        this.vendedoresService
          .update(this.submittedVendedor, this.submittedVendedor.vendedor_id)
          .subscribe((res) => this.router.navigate(['contratos/listar']));
        this.vendedoresService.postImage(this.submittedVendedor.vendedor_id,this.blob).subscribe(res=>{
          console.log(res)
        })
      } else {
        this.vendedoresService
          .create(this.vendedorForm.value)
          .subscribe((res:any) => {
            if(this.blob.size)this.vendedoresService.postImage(res.data.insertId,this.blob).subscribe(res=>{
              console.log(res)
            })
          });
      }
    } else {
      this.vendedorForm.markAllAsTouched();
      this.campos.some((campo) => {
        if (this.vendedorForm.controls[campo].invalid) {
          this.addFocusInput(campo);
          return true;
        }
      });
    }
  }

}

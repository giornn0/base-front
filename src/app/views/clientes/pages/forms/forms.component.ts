import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaskedDate } from "../../../../shared/functions/mask.date";
import { ClientesService } from "../../../../services/http/clientes/clientes.service";
import { Cliente } from "../../../../shared/models/cliente.model";
import { BehaviorSubject } from "rxjs";
import { formatDate } from "../../../../shared/functions/formDate";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  templateUrl: "forms.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class FormsComponent implements OnInit {
  dateMask = MaskedDate;
  formatDate = formatDate
  isEdit = false;

  constructor(
    private fBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private router: Router, private sanitizer: DomSanitizer
  ) {}

  tiposDoc: {}[] = [
    { name: "DNI", value: 96 },
    { name: "LC  ", value: 90 },
    { name: "LE", value: 89 },
    { name: "CI ", value: 12 },
    { name: "PAS", value: 94 },
    { name: "OTROS", value: 100 },
  ];

  activarPresta: BehaviorSubject<boolean> = new BehaviorSubject(false);

  submittedCliente: Cliente = {} as Cliente;

  clienteForm: FormGroup = this.fBuilder.group({
    cliente_id:[''],
    nombre: [null, [ Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
    apellido: [null,[Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,30}$/)]],
    email: [null,[Validators.pattern(/^[a-zA-Z0-9-.]{4,20}@[a-zA-Z0-9-]+\.(com|net|org|)$/)]],
    tipo_documento: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    numero_documento: [null, [Validators.required, Validators.pattern(/^[0-9]{6,10}$/)]],
    profesion:[null,[Validators.pattern(/^[a-zA-Z\s]{4,30}$/)]],
    phone:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
    cellphone:[null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
    fecha_nacimiento: [null,[Validators.required]],
    domicilio_dni: [null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9-\s°]{4,50}$/)]],
    localidad: [null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9-\s°]{4,50}$/)]],
    codigo_postal: [null,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
    estado_civil: [null,[Validators.pattern(/^[a-zA-Z0-9-\s°]{4,50}$/)]],
  });

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      if(data.clienteParaEditar){
        this.isEdit = true
        this.submittedCliente = data.clienteParaEditar.data[0]
        this.clienteForm.reset(this.submittedCliente)
        this.clienteForm.controls['fecha_nacimiento'].setValue(this.formatDate(data.clienteParaEditar.data[0].fecha_nacimiento))
      }      
    }); 
    this.clienteForm.valueChanges.subscribe(
      (form) => {this.submittedCliente = form;
        console.log(this.clienteForm.valid,)
      })
  }
  isTouched(field: string): boolean {
    return !!this.clienteForm.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.clienteForm.controls[field].touched &&
      this.clienteForm.controls[field].invalid
    );
  }

  campos: string[] = [
    "apellido",
    "nombre",
    "email",
    "tipo_documento",
    "nro_documento",
    "profesion",
    "phone",
    "cellphone",
    "fecha_nacimiento",
    "domicilio_dni",
    "localidad",
    "codigo_postal",
    "estado_civil"
  ];

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
      this.submittedCliente.type_picture =file.target.files[0].type 
      const source = window.URL.createObjectURL(this.blob);
      this.pictureURL = this.sanitizer.bypassSecurityTrustUrl(source);
    };
    reader.readAsArrayBuffer(file.target.files[0]);
  }

  submit() {
    console.log(this.submittedCliente)
    if (this.clienteForm.valid) {
      if(this.isEdit){
        this.clientesService.update(this.submittedCliente,this.submittedCliente.cliente_id).subscribe(res=>{
          this.router.navigate(['clientes'])
        })
        this.clientesService.postImage(this.submittedCliente.cliente_id,this.blob).subscribe(res=>{
          console.log(res)
        })
      }
      else{
        this.clientesService
        .create(this.submittedCliente)
        .subscribe((res:any) => {
            this.router.navigate(['contratos/crear'],{queryParams:{cliente_id:res.data.insertId}})
            if(this.blob.size)this.clientesService.postImage(res.data.insertId,this.blob).subscribe(res=>{
                console.log(res)
              })
          });
      }
    } else {
      this.clienteForm.markAllAsTouched();
      this.campos.some((campo) => {
        if (this.clienteForm.controls[campo].invalid) {
          this.addFocusInput(campo);
          return true;
        }
      });
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ContratosService } from "../../../../services/http/contratos/contratos.service";
import { formatDate } from "../../../../shared/functions/formDate";
import { MaskedDate } from "../../../../shared/functions/mask.date";
import { maskedMt2 } from "../../../../shared/functions/maskedMt2";
import { maskedMoney } from "../../../../shared/functions/maskMoney";
import { Cliente } from "../../../../shared/models/cliente.model";
import { Contrato } from "../../../../shared/models/contrato.model";
import { Vendedor } from "../../../../shared/models/vendedor.model";

@Component({
  templateUrl: "form.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class FormComponent implements OnInit {
  dateMask = MaskedDate;
  maskedMoneyValue = maskedMoney
  maskedMt2Value = maskedMt2
  formatDate = formatDate

  defValues={
    valor_mt2: '$0',
    mt2_cubiertos:'0 mt²',
    mt2_semicubiertos:'0 mt²',
    mt2_totales:'0 mt²'
  }
  appendValues={
    mt2_cubiertos:' mt²',
    mt2_semicubiertos:' mt²',
    mt2_totales:' mt²'  
  }

  submittedContrato :Contrato = {} as Contrato;

  constructor(
    private fBuilder: FormBuilder,
    private contratosService: ContratosService,
    private activatedRoute: ActivatedRoute,
    private router:Router, private sanitizer: DomSanitizer
  ) {}

  contratoForm: FormGroup = this.fBuilder.group({
    contrato_id: [''],
    numero_contrato: [null,[Validators.required, Validators.pattern(/^[a-zA-Z 0-9-]{4,30}$/)]],
    cliente_id: [null,[Validators.required, Validators.min(1)]],
    vendedor_id: [null,[Validators.required, Validators.min(1)]],
    valor_mt2: ['$0',[Validators.required, Validators.pattern(/^\$[^0][0-9.,]{1,10}$/)]],
    fecha_contrato: [null,[Validators.required]],
    tipo_contrato: [null,[Validators.required, Validators.pattern(/^[a-zA-Z\s0-9-]{4,30}$/)]],
    financiacion: [null,[Validators.required, Validators.pattern(/^[a-zA-Z\s0-9-]{4,30}$/)]],
    observaciones: [null,[ Validators.pattern(/^[a-zA-Z -0-9\s. ]{4,200}$/)]],
    tipo_construccion:[null,[Validators.required]],
    tipologia:[null,[Validators.required]],
    dormitorios:[null,[Validators.required]],
    mt2_cubiertos:['0 mt²',[Validators.required,Validators.pattern(/^[0-9.,]{1,10}( mt²)?$/)]],
    mt2_semicubiertos:['0 mt²',[Validators.required,Validators.pattern(/^[0-9.,]{1,10}( mt²)?$/)]],
    terminacion:[null,[Validators.required]],
    mt2_totales:['0 mt²',[Validators.required,Validators.pattern(/^[0-9.,]{1,10}( mt²)?$/)]],
  });


  
  isEdit = false;
  campos: string[] = [
    'numero_contrato',
    'cliente_id',
    'vendedor_id',
    'presupuesto',
    'fecha_contrato',
    'tipo_contrato',
    'financiacion',
    'observaciones',
  ]
  clientes : Cliente[]=[]
  vendedores :Vendedor[]=[]
  focusing=false

  ngOnInit() {
    this.addFocusInput('numero_contrato')
    this.activatedRoute.data.subscribe((data) => {
      this.clientes = data.clientes.data
      this.vendedores = data.vendedores.data
      if (data.contratoParaEditar) {
        this.isEdit = true;
        this.submittedContrato = data.contratoParaEditar.data[0] 
        this.contratoForm.reset(this.submittedContrato);
        this.contratoForm.controls['fecha_contrato'].setValue(this.formatDate(data.contratoParaEditar.data[0].fecha_contrato));
        
      }
    });
    this.contratoForm.controls['mt2_cubiertos'].valueChanges.subscribe(mt2=>{
      if(mt2.slice(0,-4)){
        const semi = this.contratoForm.controls['mt2_semicubiertos'].value.slice(0,-4)
        const cubiertos = this.contratoForm.controls['mt2_cubiertos'].value.slice(0,-4)
        this.contratoForm.controls['mt2_totales'].setValue((parseFloat(semi)+parseFloat(cubiertos))+' mt²')
      }
    })
    this.contratoForm.controls['mt2_semicubiertos'].valueChanges.subscribe(mt2=>{
      if(mt2.slice(0,-4)){
        const semi = this.contratoForm.controls['mt2_semicubiertos'].value.slice(0,-4)
        const cubiertos = this.contratoForm.controls['mt2_cubiertos'].value.slice(0,-4)
        this.contratoForm.controls['mt2_totales'].setValue((parseFloat(semi)+parseFloat(cubiertos) + ' mt²'))
      }
    })
    this.contratoForm.valueChanges.subscribe(form=>{this.submittedContrato = form })
    this.activatedRoute.queryParams.subscribe(params=>{
      Object.keys(params).forEach(key=>{
        this.contratoForm.controls[key].setValue(params[key])
      })
    })
  }

  isTouched(field: string): boolean {
    return !!this.contratoForm.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.contratoForm.controls[field].touched &&
      this.contratoForm.controls[field].invalid
    );
  }
  focusClear(campo:string){
    if(this.contratoForm.controls[campo].invalid)this.contratoForm.controls[campo].setValue(this.defValues[campo])
    else{
      if(this.appendValues[campo]&& !this.contratoForm.controls[campo].value.toString().includes(this.appendValues[campo]))this.contratoForm.controls[campo].setValue(this.contratoForm.controls[campo].value+this.appendValues[campo])
    }
  }
  addFocusInput(campo: string) {
    document.getElementById(campo).focus();
  }


  cleanBlob(){
    this.blob = new Blob()
    this.fileURL = ''
  }

  fileURL:SafeResourceUrl=''
  blob : Blob = new Blob()

  upload(file){
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.blob = new Blob(file.target.files, {
        type: file.target.files[0].type,
      });
      this.submittedContrato.type_files =file.target.files[0].type 
      const source = window.URL.createObjectURL(this.blob);
      this.fileURL = this.sanitizer.bypassSecurityTrustUrl(source);
    };
    reader.readAsArrayBuffer(file.target.files[0]);
  }


  submit() {
    if (this.contratoForm.valid) {
      if (this.isEdit) {
        this.contratosService
          .update(this.submittedContrato,this.submittedContrato.contrato_id)
          .subscribe((res) => this.router.navigate(['contratos/listar']));
          this.contratosService.postImage(this.submittedContrato.contrato_id,this.blob).subscribe(res=>{
            console.log(res)
          })
      } else {
        this.contratosService
          .create(this.submittedContrato)
          .subscribe((res:any) => {
            if(this.blob.size) this.contratosService.postImage(res.data.insertId,this.blob).subscribe(res=>{
              console.log(res)
            })
          });;
      }
    } else {
      this.contratoForm.markAllAsTouched();
      this.campos.some((campo) => {
        if (this.contratoForm.controls[campo].invalid) {
          this.addFocusInput(campo);
          return true;
        }
      });
    }
  }
  nowDate(){
    const today = new Date()
    this.contratoForm.controls['fecha_contrato'].setValue(today)
  }
  
}

import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PagosService } from "../../../../services/http/pagos/pagos.service";
import { Contrato } from "../../../../shared/models/contrato.model";
import { MaskedDate } from '../../../../shared/functions/mask.date';
import { formatDate } from "../../../../shared/functions/formDate";
import { Pago } from "../../../../shared/models/pago.model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { maskedMoney } from '../../../../shared/functions/maskMoney';

@Component({
  templateUrl: "form.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class FormComponent implements OnInit {
  dateMask = MaskedDate
  maskedMoneyValue=maskedMoney
  formatDate = formatDate


  defValues={
    monto: '$0'
  }

  isEdit = false;
  campos: string[] = [
    "obra_social_id",
    "codigo",
    "titulo",
    "nombre",
    "numero_tabla_asociada",
    "estado",
  ];
  
  constructor(
    private fBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private router: Router, private sanitizer: DomSanitizer
  ) {}

  title=''
  focusing=false;
  focusImg(){
    console.log(this.focusing)
    this.focusing=true
  }

  pagoForm: FormGroup = this.fBuilder.group({
    pago_id:'',
    contrato_id:[,[Validators.required, Validators.min(1)]],
    medio_pago:[,[Validators.required, Validators.min(1)]],
    monto:['$0',[Validators.required, Validators.min(1)]],
    fecha_pago:[,[Validators.required]],
    aceptado:[null,],
  });

  contratos: Contrato[]=[]
  submittedPago: Pago = {} as Pago;

  ngOnInit() {  
    this.pagoForm.valueChanges.subscribe(form=>this.submittedPago = form)
    this.activatedRoute.queryParams.subscribe(params=>{
      Object.keys(params).forEach(key=>{
        this.pagoForm.controls[key].patchValue(params[key])
      })
    })
    this.activatedRoute.data.subscribe((data) => {
      this.title = data.title
      this.contratos = data.contratos.data
      if (data.pagoParaEditar) {
        this.isEdit = true;
        this.submittedPago = data.pagoParaEditar.data[0] 
        this.pagoForm.reset( this.submittedPago);
        this.pagoForm.controls['fecha_pago'].setValue(this.formatDate(this.submittedPago.fecha_pago));
      }
    });
  }

  isTouched(field: string): boolean {
    return !!this.pagoForm.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.pagoForm.controls[field].touched &&
      this.pagoForm.controls[field].invalid
    );
  }
  focusClear(campo:string){
    if(this.pagoForm.controls[campo].invalid)this.pagoForm.controls[campo].setValue(this.defValues[campo])
  }

  addFocusInput(campo: string) {
    document.getElementById(campo).focus();
  }

  nowDate(){
    const today = new Date()
    this.pagoForm.controls['fecha_pago'].setValue(today)
  }

  cleanBlob(){
    this.blob = new Blob()
    this.comprobanteURL = ''
  }


  comprobanteURL:SafeResourceUrl=''
  blob : Blob = new Blob()

  upload(file){
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.blob = new Blob(file.target.files, {
        type: file.target.files[0].type,
      });
      this.submittedPago.type_comprobante =file.target.files[0].type 
      const source = window.URL.createObjectURL(this.blob);
      this.comprobanteURL = this.sanitizer.bypassSecurityTrustUrl(source);
    };
    reader.readAsArrayBuffer(file.target.files[0]);
  }

  submit() {
    if (this.pagoForm.valid) {
      if (this.isEdit) {
        this.pagosService
          .update(this.submittedPago, this.submittedPago.pago_id)
          .subscribe((res) => {this.router.navigate(['pagos/listar']);console.log(res)})
        this.pagosService.postImage(this.submittedPago.pago_id,this.blob).subscribe(res=>{
          console.log(res)
        })
      } else {
        this.pagosService
          .create(this.submittedPago)
          .subscribe((res:any) => {
            if(this.blob.size) this.pagosService.postImage(res.data.insertId,this.blob).subscribe(res=>{
              console.log(res)
            })
          });
      }
    } else {
      this.pagoForm.markAllAsTouched();
      this.campos.some((campo) => {
        if (this.pagoForm.controls[campo].invalid) {
          this.addFocusInput(campo);
          return true;
        }
      });
    }
  }
}

import { map } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TarjetaService } from 'src/app/services/tarjeta/tarjetas.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {

  // @ViewChild(IonList) ionList: IonList;


  filterGroup: FormGroup;

  array_estado: any = [
    { value: '0000', nombre:'Todos' },
    { value: '0001', nombre:'DÍAS DE CONSUMO' },
    { value: '0002', nombre:'AVISO PARA PAGAR' },
    { value: '0003', nombre:'DÍAS DE ATRASO' },
    { value: '0004', nombre:'CANCELADAS' },
  ];
  array_tarjetas:any = []
  array_tarjetasBase:any = []
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tarjetaService:TarjetaService,
    private chgRef: ChangeDetectorRef,
    private toastrService: ToastrService,
  ) {
    this.isLoading$ = this.tarjetaService.isLoading$;
   }

  ngOnInit() {
    this.filterInit();
  }

  filterInit(){
    this.filterGroup = this.fb.group({
      Estado: [null]
    });
  }

  getFilter(event){
    const valor = event.detail.value;
    let newArray  = [];
    if(valor == '0000'){
      this.array_tarjetas = this.array_tarjetasBase;
      this.chgRef.markForCheck();
    }else if(valor == '0001'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.estado == "0001");
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else if(valor == '0002'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.estado == "0002");
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else if(valor == '0003'){
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.estado == "0003");
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }else{
      newArray = this.array_tarjetasBase.filter((elemento) => elemento.isActive == false);
      this.array_tarjetas = newArray;
      this.chgRef.markForCheck();
    }

  }

  async getTarjetasByPerson() {
    const getPerson = await this.tarjetaService.getTarjetasByPerson();

    getPerson.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.array_tarjetas = resp;
        this.array_tarjetasBase = resp;
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }

  ionViewWillEnter() {
   this.getTarjetasByPerson();
  }

  onShow(){
    this.router.navigate(['/main/tabs/tarjetas/show']);
  }

  onSaveUpdate(){
    this.router.navigate(['/main/tabs/tarjetas/save-update-tarjeta']);
  }
}

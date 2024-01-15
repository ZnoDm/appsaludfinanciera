import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TarjetaService } from 'src/app/services/tarjetas/tarjetas.service';
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
    this.getTarjetasByPerson();
  }


  async getTarjetasByPerson() {
    const getPerson = await this.tarjetaService.getTarjetasByPerson();

    getPerson.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.array_tarjetas = resp;
        this.chgRef.markForCheck();
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });

  }





  onShow(){
    this.router.navigate(['/main/tabs/tarjetas/show']);
  }
  onSaveUpdate(){
    this.router.navigate(['/main/tabs/tarjetas/save-update-tarjeta']);
  }
}

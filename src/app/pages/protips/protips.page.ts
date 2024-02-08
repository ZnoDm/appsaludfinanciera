import { Component, OnInit } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-protips',
  templateUrl: './protips.page.html',
  styleUrls: ['./protips.page.scss'],
})
export class ProtipsPage implements OnInit {
  valor:number = 0.00;
  datosFinales:any= [];
  constructor(
    private machineService:MachineService,
    private toastrService:ToastrService,
  ) {

   }

  ngOnInit() {
    this.gastosMes();
    this.getGastosHormiga();
  }

  async gastosMes(){
    const getResumenGastoByPerson = await this.machineService.gastosMes();

    getResumenGastoByPerson.subscribe({
      next: async (resp: any) => {
        console.log(resp)
        this.valor = resp.futuro;
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }
  async getGastosHormiga(){
    const getGastosHormiga = await this.machineService.getGastosHormiga();

    getGastosHormiga.subscribe({
      next: async (resp: any) => {
        console.log(resp)

        for (let i = 0; i < resp.gastos_hormida.length; i++) {
          console.log(resp.gastos_hormida[i])
          const item ={ 'key' : resp.gastos_hormida[i]}; // Puedes asignar un valor inicial si lo deseas
          this.datosFinales.push(item)
        }

        console.log(this.datosFinales);
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        console.log(error);
      },
    });
  }

}

import { DatePipe } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { PickerController, ModalController, IonModal, IonicSlides, LoadingController } from '@ionic/angular';
import { ToastrService } from 'src/app/services/toastr.service';
import { register } from 'swiper/element';
import { Swiper, SwiperOptions } from 'swiper/types';
import { CategoriaGastoService } from '../../../../services/categoria-gasto/categoria-gasto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from '../../../../services/cuenta/cuenta.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  providers: [ DatePipe ]
})
export class AgregarPage implements OnInit {
  swiperModules = [IonicSlides];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  selectedTab:string = 'variable';

  fechaActual : any;
  nombreDia: string;
  fechaMes: string;

  array_categorias:any =  null;
  formGasto: FormGroup;
  @Input() array_cuentas:any =  [];

  isLoading$: Observable<boolean>;
  isLoadingCategoriaGasto$: Observable<boolean>;
  constructor(
    private cuentaService:CuentaService,
    private categoriaGastoService:CategoriaGastoService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    public formBuilder: FormBuilder,
    private chgRef: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.isLoading$ = this.cuentaService.isLoading$;
    this.isLoadingCategoriaGasto$ = this.categoriaGastoService.isLoading$;
    const fecha = new Date();
    this.obtenerFechaActualConFormato(fecha);
  }



  ngOnInit() {
    this.formGastoInit();
    this.selectedTab = 'variable';
    //GASTOS VARIABLES ID = 2
    //GASTOS FIJOS ID = 1
    this.findAllByUserTipoGasto(2);

  }

  formGastoInit(){
    this.formGasto = this.formBuilder.group({
      cuenta: [this.array_cuentas[0].id , Validators.required],
      fecha: [this.fechaActual, Validators.required],
      monto: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      categoriaGasto: [null],
    });
  }
  private prepareModel (){
    const form = this.formGasto.value
    return {
      cuentaId: form.cuenta,
      tipoGastoId: (this.selectedTab == 'variable') ? 2 : 1,
      fecha: form.fecha,
      monto: form.monto,
      categoriaGasto: form.categoriaGasto,
    }
  }
  async onSubmit() {
    console.log(this.prepareModel())
    if (this.formGasto.valid) {
      const addGasto = await this.cuentaService.addGasto(this.prepareModel());

      addGasto.subscribe({
        next: async (resp: any) => {
          if(resp.ok ==true){
            this.modalController.dismiss(resp);
          }
        },
        error: async (error) => {
          this.toastrService.alertaInformativa(error?.error?.message || error?.message);
        },
      });
    }
  }

  async findAllByUserTipoGasto(tipoGasto:number){
    this.array_categorias = null;
    const findAllByUserTipoGasto = await this.categoriaGastoService.findAllByUserTipoGasto(tipoGasto);

    findAllByUserTipoGasto.subscribe({
      next: async (resp: any) => {
        this.array_categorias = resp.map((resp) => ({
          ...resp,
          active: false,
        }));
      },
      error: async (error) => {
        this.toastrService.alertaInformativa(error?.error?.message || error?.message);
      },
    });
  }

  obtenerFechaActualConFormato(fecha:Date){
    this.fechaActual = fecha;
    this.nombreDia = this.datePipe.transform(fecha, 'EEEE', null, this.locale);
    this.fechaMes = this.datePipe.transform(fecha, 'd \'de\' MMMM', null, this.locale);
  }

  showCalendar = false;
  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    if(selectedDate != null){
     // Actualizar el valor del campo 'fecha' en el formulario
      this.formGasto.get('fecha').setValue(event.detail.value);
      this.obtenerFechaActualConFormato(selectedDate)
    }
  }
  openCalendar() {
    this.showCalendar = true;
  }
  cancelCalendar() {
    this.showCalendar = false;
  }
  closeModal() {
    this.modalController.dismiss();
  }

  onCategorySelected(category:any){
    this.array_categorias.forEach((cat) => {
      cat.active = cat === category;
    });
    this.formGasto.get('categoriaGasto').setValue(category.nombre);
  }

  validarCategoria(event: any): void {
    let inputValue = event.target.value;
    this.array_categorias.forEach((cat) => {
      if(cat.nombre === inputValue){
        cat.active = true;
      }else{
        cat.active = false;
      }
    });
    this.chgRef.markForCheck();
  }

  validarNumero(event: any): void {
    let inputValue = event.target.value;

    // Reemplaza todos los caracteres que no son números o el primer punto decimal
    inputValue = inputValue.replace(/[^\d.]/g, '');

    // Divide la entrada en parte entera y parte decimal
    const partes = inputValue.split('.');
    // Limita la longitud de la parte entera a 3 dígitos
    if (partes[0].length > 3) {
      partes[0] = partes[0].slice(0, 3);
    }

    // Limita la parte decimal a un máximo de 2 dígitos
    if (partes.length > 1) {
      partes[1] = partes[1] ? partes[1].slice(0, 2) : '';
    }

    // Vuelve a unir las partes con un solo punto decimal
    inputValue = partes.slice(0, 2).join('.');

    // Actualiza el valor del controlador de formulario 'monto'
    this.formGasto.get('monto').setValue(inputValue);
  }
  onSegmentChange(event) {
    this.selectedTab = event.detail.value;
    if (this.selectedTab === 'variable') {
      this.findAllByUserTipoGasto(2);
    } else if (this.selectedTab === 'fijo') {
      this.findAllByUserTipoGasto(1);
    }
  }
  async showLoading(duracion) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: duracion,
    });

    loading.present();
  }
}

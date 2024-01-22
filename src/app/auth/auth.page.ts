import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from '../services/toastr.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit{

  swiperModules = [IonicSlides];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;


  formLogin: FormGroup;
  formRegister: FormGroup;

  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit() {
    this.swiperRef?.nativeElement.swiper.allowSlideNext(false)
    this.formLoginInit();
    this.formRegisterInit();
  }

  formLoginInit(){
    this.formLogin = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  async onSubmitLogin() {
    if ( this.formLogin.invalid ) {
      this.toastr.alertaInformativa('Formulario Inválido');
      return;
    }
    const valido = await this.authService.login(this.formLogin.get('email').value , this.formLogin.get('password').value);
    console.log({valido});
    if ( valido ) {
       this.authService.redirectToMain();
    }
  }

  private prepareModelRegistro(){
    const formData = this.formRegister.value;
    return {
      email: formData.email,
      password: formData.password,
      nombres: formData.nombres,
      apellidos: formData.apellidos
    }
  }

  async onSubmitRegister() {
    if (this.formRegister.invalid) {
      this.toastr.alertaInformativa('Formulario Inválido');
    }
    const model = this.prepareModelRegistro();
    const valido = await this.authService.registro( model);
    console.log(valido)
    // if ( valido ) {
    //   this.authService.redirectToMain();
    // }
  }
  formRegisterInit(){
    this.formRegister = this.fb.group({
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }



  swiperSlideChanged(e: any){ console.log('changed',e); }
  showLogIn() { this.swiperRef?.nativeElement.swiper.slidePrev(1000)}
  showLogOut() { this.swiperRef?.nativeElement.swiper.slideNext(1000) }
}

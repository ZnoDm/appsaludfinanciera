import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';


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
    private usuario_s:AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.isLoading$ = this.usuario_s.isLoading$;
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
    const valido = await this.usuario_s.login(this.formLogin.get('email').value , this.formLogin.get('password').value);
    if ( valido ) {
      this.usuario_s.redirectToMain();
    }
  }
  onSubmitRegister() {
    if (this.formRegister.valid) {

      console.log('Nombre enviado:', this.formLogin.get('email').value);
      // Aquí puedes realizar acciones adicionales, como enviar el formulario al servidor.
    }
  }
  formRegisterInit(){
    this.formRegister = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }



  swiperSlideChanged(e: any){ console.log('changed',e); }
  showLogIn() { this.swiperRef?.nativeElement.swiper.slidePrev(1000)}
  showLogOut() { this.swiperRef?.nativeElement.swiper.slideNext(1000) }
}

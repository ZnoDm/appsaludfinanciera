import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { HeaderPeriodoComponent } from './header-periodo/header-periodo.component';
import { FormsModule } from '@angular/forms';
import { ArticleComponent } from './news/article/article.component';
import { ArticlesComponent } from './news/articles/articles.component';
import { CalendarioTarjetaComponent } from './tarjetas/calendario-tarjeta/calendario-tarjeta.component';
import { LogoComponent } from './logo/logo.component';
import { EsloganComponent } from './eslogan/eslogan.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPeriodoComponent,
    ArticleComponent,
    ArticlesComponent,
    CalendarioTarjetaComponent,
    LogoComponent,
    EsloganComponent,
    AvatarComponent
  ],
  exports: [
    HeaderPeriodoComponent,
    HeaderComponent,
    ArticleComponent,
    ArticlesComponent,
    CalendarioTarjetaComponent,
    LogoComponent,
    EsloganComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { HeaderPeriodoComponent } from './header-periodo/header-periodo.component';
import { FormsModule } from '@angular/forms';
import { ArticleComponent } from './news/article/article.component';
import { ArticlesComponent } from './news/articles/articles.component';
import { CalendarioTarjetaComponent } from './tarjetas/calendario-tarjeta/calendario-tarjeta.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPeriodoComponent,
    ArticleComponent,
    ArticlesComponent,
    CalendarioTarjetaComponent
  ],
  exports: [
    HeaderPeriodoComponent,
    HeaderComponent,
    ArticleComponent,
    ArticlesComponent,
    CalendarioTarjetaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }

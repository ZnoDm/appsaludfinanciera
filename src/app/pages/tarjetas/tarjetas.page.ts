import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {

  usuarios: any = [
    {
      name:'asdas',

    },
    {
      name:'asdas',

    },
    {
      name:'asdas',

    },
    {
      name:'asdas',

    }
  ];

  @ViewChild(IonList) ionList: IonList;


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onShow(){
    this.router.navigate(['/main/tabs/tarjetas/show']);
  }
}

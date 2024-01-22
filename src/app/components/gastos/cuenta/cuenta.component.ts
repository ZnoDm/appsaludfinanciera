
import { Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent implements OnInit {
  @Input() nuevo: any = false;
  @Input() cuenta: any = null;

  ngOnInit(): void { }

}

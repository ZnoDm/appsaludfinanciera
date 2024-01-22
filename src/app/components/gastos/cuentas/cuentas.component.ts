
import { Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss'],
})
export class CuentasComponent implements OnInit {
  @Input() nuevo: any = false;
  @Input() cuenta: any = null;

  ngOnInit(): void { }

}

import { Component } from '@angular/core';

//TOTALMENTE NECESARIO
import { register } from 'swiper/element/bundle';
import { PushService } from './services/push.service';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private pushService: PushService
  ) {
    // this.pushService.OneSignalInit()
  }

}

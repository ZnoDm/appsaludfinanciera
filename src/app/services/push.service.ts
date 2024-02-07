import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  onSignalAppId: string = environment.onSignaLAppId;
  idRemitente: string = environment.idRemitente;

  constructor() { }

  OneSignalInit(){
    // Remove this method to stop OneSignal Debugging
    // OneSignal.Debug.setLogLevel(6)

    // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
    OneSignal.initialize(this.onSignalAppId);

    OneSignal.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    })

    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log("Notification permission granted " + success);
    })
  }
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
  ){
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async get(key: string) {
    const valor =  await this.storage.get(key) || null;
    return valor;
  }

  async set(key: string, value: string) {

    await this.storage.set(key, value);
  }

  async getJson(key: string): Promise<any | null> {
    // let json = null;
    // try {
    //   const dataJson = await this.get(key);
    //   if (dataJson !== null) {
    //     json = JSON.parse(dataJson);
    //   }
    // } catch (e) {
    //   console.error('Error al obtener JSON:', e);
    // }
    // return json;
  }


  setJson(key: string, value: any) {
    // this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.remove(key);
  }
}

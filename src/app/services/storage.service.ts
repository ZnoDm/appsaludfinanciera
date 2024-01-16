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

  remove(key: string) {
    this.storage.remove(key);
  }
}

import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public guardados: Registro[] = [];
  private _storage: Storage | null = null;

  constructor(  private storage: Storage,
                private navCtr: NavController,
                private iab: InAppBrowser) {

    this.init();

  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async cargarregistros(){
    this.guardados = await (this.storage.get( 'registros' )) || [];
  }


  guardarRegistro( format: string, text: string ){

    this.cargarregistros();

    const nuevoRegistro = new Registro( format, text );
    this.guardados.unshift( nuevoRegistro );
    console.log( this.guardados );

    this._storage.set( 'registros', this.guardados );
    this.abrirRegristro( nuevoRegistro );

  }


  abrirRegristro( resgistro: Registro ){
    this.navCtr.navigateForward( '/tabs/tab2' );

    switch( resgistro.type ){

      case 'http':
          this.iab.create('https://ionicframework.com/');
          break;

      case 'geo':
          this.navCtr.navigateForward(`/tabs/map/${resgistro.text}`);
          break;


        default: break;

    }


  }

}

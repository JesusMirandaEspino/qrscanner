import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public guardados: Registro[] = [];
  private _storage: Storage | null = null;

  constructor( private storage: Storage) {

    this.init();

  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
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

  }

}

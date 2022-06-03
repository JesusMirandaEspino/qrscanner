import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public guardados: Registro[] = [];
  private _storage: Storage | null = null;


  // pk.eyJ1IjoiamVzdXNtaXJhbmRhIiwiYSI6ImNsM25yYzI2cTBmdTczanBla2oxNzNyN3AifQ.2bvOozjRsLKfU6rcTXaPEA

  constructor(  private storage: Storage,
                private navCtr: NavController,
                private iab: InAppBrowser,
                private file: File,
                private emailComposer: EmailComposer) {

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

  enviarCorreo(){
    const arregloTemp = [];
    const Titulos = 'Tipo, Formato, Creado en, Texto\n';
    arregloTemp.push( Titulos );
    this.guardados.forEach( registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`
      arregloTemp.push( linea );
    });
    console.log(arregloTemp.join('') );

    this.crearArchivoFisico( arregloTemp.join('') );

  }


  crearArchivoFisico( text: string ){
    this.file.checkFile( this.file.dataDirectory, 'registro.csv' ).then( (existe) => {
      this.escribirEnArchivo( text );
    }).catch( error => {
      return this.file.createFile( this.file.dataDirectory, 'registro.csv', false ).then( creado => {
        this.escribirEnArchivo( text );
      }).catch( error2 => { console.log( error2 ) });
    });
  }

  async escribirEnArchivo( text: string ){
    await this.file.writeExistingFile( this.file.dataDirectory, 'registro.csv', text );
    const archivo = `${this.file.dataDirectory}/registro.csv`

  const email = {
    to: 'max@mustermann.de',
    attachments: [
      archivo
    ],
    subject: 'Cordova Icons',
    body: 'How are you? Nice greetings from Leipzig',
    isHtml: true
  }

  // Send a text message using default options
  this.emailComposer.open(email);

  }

}

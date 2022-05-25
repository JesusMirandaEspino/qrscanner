import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private barcodeScanner: BarcodeScanner, private dataLocalService: DataLocalService ){

  }

  scan(){
      this.barcodeScanner.scan().then(barcodeData => {


        if( !barcodeData.cancelled ){
          this.dataLocalService.guardarRegistro( barcodeData.format, barcodeData.text );
        }

      console.log('Barcode data', barcodeData);
      }).catch(err => {
          console.log('Error', err);
          this.dataLocalService.guardarRegistro( 'QRCode', 'https://ionicframework.com/docs/native/barcode-scanner' );
      });
  }

}

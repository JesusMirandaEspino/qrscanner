import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  public lat: number;
  public lng: number;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.activatedRoute.snapshot.paramMap.get('geo');
    geo = geo.substring(4);
    geo = geo.split(',');
    this.lat = Number(geo[0]);
    this.lng = Number(geo[0]);
    console.log(this.lat, this.lng);
  }

  ngAfterViewInit(): void {


    mapboxgl.accessToken = 'pk.eyJ1IjoiamVzdXNtaXJhbmRhIiwiYSI6ImNsM25yYzI2cTBmdTczanBla2oxNzNyN3AifQ.2bvOozjRsLKfU6rcTXaPEA';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });

  }

}

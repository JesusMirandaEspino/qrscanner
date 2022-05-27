import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

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

}

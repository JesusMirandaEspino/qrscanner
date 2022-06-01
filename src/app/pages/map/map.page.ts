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
        style: 'mapbox://styles/mapbox/light-v10',
        center: [ this.lng, this.lat],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
        });



        map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find( (layer) =>
              layer.type === 'symbol' && layer.layout['text-field'] ).id;

        map.resize();

        new mapboxgl.Marker().setLngLat([ this.lng, this.lat]).addTo(map);

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
                'fill-extrusion-color': '#aaa',
                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                  'fill-extrusion-height': [ 'interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height'] ],
                  'fill-extrusion-base': [ 'interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height'] ],
                  'fill-extrusion-opacity': 0.6
                  }
        }, labelLayerId );
        });
  }

}

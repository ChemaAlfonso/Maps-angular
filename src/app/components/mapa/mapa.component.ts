import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../clases/marcador.class';


import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef } from '@angular/material';


import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];
  
  lat = 40.264790616305774;
  lng = -4.071997971853307;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.getStorage();
   }
   
  ngOnInit() {
  }

  agregarmarcador( $event ){

    const coords: {lat: number, lng: number} = $event.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng, 'Un buen titulo', 'Sin descripcion');

    this.marcadores.push( nuevoMarcador );
    this.guardarStorage();

    this.snackBar.open('Marcador creado', 'Cerrar', {duration: 2000});
  }

  editarMarcador( i: number ){
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: {titulo: this.marcadores[i].titulo, desc: this.marcadores[i].descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result){
        return;
      }

      this.marcadores[i].titulo      = result.titulo;
      this.marcadores[i].descripcion = result.desc;
      
      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', {duration: 2000});

    });
  }

  borrarMarcador( index: number ){
    this.marcadores.splice(index, 1);
    this.guardarStorage();

    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 2000});
  }


  // Storage
  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ) );
  }

  getStorage(){
    if (localStorage.getItem( 'marcadores' )){
      this.marcadores = JSON.parse( localStorage.getItem( 'marcadores' ) );
    }
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material components
import { MaterialModule } from './material.module';
import { MapaComponent } from './components/mapa/mapa.component';

// AGM
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOURAPIKEYHERE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

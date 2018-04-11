import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { IndexComponent } from './index/index.component';

import { FormsModule } from '@angular/forms';
import { GeneralService } from './service/general.service';
import { AppRoutingModule } from './app-routing.module';
import { ContainerGeneralComponent } from './container-general/container-general.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    IndexComponent,
    ContainerGeneralComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }

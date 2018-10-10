import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { TetrisNavbarComponent } from './tetris-navbar/tetris-navbar.component';
import { Game } from 'src/domain/Game';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    TetrisNavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

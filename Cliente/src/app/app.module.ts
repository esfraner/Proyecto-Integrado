import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerListComponent } from "./player-list/player-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MenuNavbarComponent } from "./menu-navbar/menu-navbar.component";
import { PlayerInformationComponent } from "./player-information/player-information.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    MenuNavbarComponent,
    PlayerInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

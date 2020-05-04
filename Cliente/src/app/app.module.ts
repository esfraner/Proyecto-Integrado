import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerListComponent } from "./player-list/player-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MenuNavbarComponent } from "./menu-navbar/menu-navbar.component";
import { PlayerInformationComponent } from "./player-information/player-information.component";
import { PlayerService } from "./player-list/player.service";
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
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerListComponent } from "./player-list/player-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material/core";

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";

import { FileUploadModule } from "ng2-file-upload";
import { MatPaginatorModule } from "@angular/material/paginator";

import { MenuNavbarComponent } from "./menu-navbar/menu-navbar.component";
import { PlayerInformationComponent } from "./player-information/player-information.component";
import { PlayerService } from "../services/player.service";
import { PlayerCardServiceService } from "src/services/player-card-service.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
/* import { SpanishDateProvider } from "src/validators/spanishDateProvider"; */
@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    MenuNavbarComponent,
    PlayerInformationComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FileUploadModule,
    MatPaginatorModule,
  ],
  providers: [
    PlayerService,
    PlayerCardServiceService,
    { provide: MAT_DATE_LOCALE, useValue: "es_ES" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

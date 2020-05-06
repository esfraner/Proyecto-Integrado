import { Component, OnInit } from "@angular/core";
import { MatDatepickerIntl } from "@angular/material/datepicker";

@Component({
  selector: "app-player-information",
  templateUrl: "./player-information.component.html",
  styleUrls: ["./player-information.component.css"],
})
export class PlayerInformationComponent implements OnInit {
  constructor() {}
  demarcaciones: String[] = [
    "Portero",
    "Defensa",
    "Central",
    "Lateral derecho",
    "Lateral izquierdo",
    "Centrocampista",
    "Delantero",
    "Delantero centro",
    "Extremo derecho",
    "Extremo izquierdo",
  ];
  ngOnInit(): void {}
}

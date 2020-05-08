import { Component, OnInit, Input } from "@angular/core";
import { Player } from "src/models/player";
import { PlayerCardServiceService } from "src/services/player-card-service.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-player-information",
  templateUrl: "./player-information.component.html",
  styleUrls: ["./player-information.component.css"],
})
export class PlayerInformationComponent implements OnInit {
  formPlayerInformation: FormGroup;
  selectedPlayer: Player;

  constructor(
    private formBuilder: FormBuilder,
    private playerCardService: PlayerCardServiceService
  ) {}

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

  ngOnInit(): void {
    this.formPlayerInformation = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      age: ["", [Validators.required, Validators.min(40)]],
      birthDay: ["", [Validators.required]],
      country: ["", [Validators.required]],
      birthPlace: ["", [Validators.required]],
      position: ["", [Validators.required]],
    });

    this.playerCardService.selectedPlayer$.subscribe((player) => {
      this.selectedPlayer = player;

      this.formPlayerInformation.patchValue({
        name: this.selectedPlayer.nombreCompleto,
        age: this.selectedPlayer.edad,
        birthDay: this.generateDate(this.selectedPlayer.fechaNacimiento),
        country: this.selectedPlayer.paisNacimiento,
        birthPlace: this.selectedPlayer.lugarNacimiento,
        position: this.selectedPlayer.demarcacion,
      });
    });
  }
  generateDate(entryDate: any) {
    const str = "'" + entryDate + "'".replace(/'/g, "").split("/");
    const year = parseInt(str[2]);
    const month = parseInt(str[1]) - 1;
    const day = parseInt(str[0]);
    return new Date(year, month, day);
  }
}

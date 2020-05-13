import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Player } from "src/models/player";
import { PlayerCardServiceService } from "src/services/player-card-service.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
@Component({
  selector: "app-player-information",
  templateUrl: "./player-information.component.html",
  styleUrls: ["./player-information.component.css"],
})
export class PlayerInformationComponent implements OnInit {
  formPlayerInformation: FormGroup;
  selectedPlayer: Player;
  testImage: string;
  public uploader: FileUploader = new FileUploader({
    url: "localhost:4200",
    disableMultipart: true,
  });

  constructor(
    private formBuilder: FormBuilder,
    private playerCardService: PlayerCardServiceService
  ) {}
  srcURL = "";

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
      id: [],
      name: ["", [Validators.required, Validators.minLength(3)]],
      age: ["", [Validators.required, Validators.min(40)]],
      birthDay: ["", [Validators.required]],
      country: ["", [Validators.required]],
      birthPlace: ["", [Validators.required]],
      position: ["", [Validators.required]],
    });

    this.playerCardService.selectedPlayer$.subscribe((player) => {
      this.selectedPlayer = player;
      if (!this.isEmpty(this.selectedPlayer)) {
        this.formPlayerInformation.patchValue({
          id: this.selectedPlayer.id,
          name: this.selectedPlayer.nombreCompleto,
          age: this.selectedPlayer.edad,
          birthDay: this.generateDate(this.selectedPlayer.fechaNacimiento),
          country: this.selectedPlayer.paisNacimiento,
          birthPlace: this.selectedPlayer.lugarNacimiento,
          position: this.selectedPlayer.demarcacion,
        });
        this.srcURL = "data:image/jpeg;base64," + this.selectedPlayer.foto;
      }
    });
  }

  generateDate(entryDate: string) {
    const str = entryDate.split("/");
    const year = parseInt(str[2]);
    const month = parseInt(str[1]) - 1;
    const day = parseInt(str[0]);
    return new Date(year, month, day);
  }

  isEmpty(player: Player): boolean {
    return JSON.stringify(player) == JSON.stringify({});
  }

  readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener(
        "load",
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.addEventListener(
        "error",
        function (event) {
          reject(event);
        },
        false
      );

      reader.readAsDataURL(file);
    });
    return future;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];

    this.readBase64(file).then((data) => {
      console.log(data);
      data = data.split(",")[1];
      this.srcURL = "data:image/jpeg;base64," + data;
    });
  }

  newPlayer() {
    //To-do: show online create player button
    this.formPlayerInformation.reset();
    this.srcURL = "";
  }
}

import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Player } from "src/models/player";
import { IPlayer } from "src/models/IPlayer";
import { PlayerCardServiceService } from "src/services/player-card-service.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { PlayerService } from "src/services/player.service";
import * as moment from "moment";
import { DateValidator } from "src/validators/validator.date";
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
  optionCreatePlayer: boolean = true;
  image: string;

  constructor(
    private formBuilder: FormBuilder,
    private playerCardService: PlayerCardServiceService,
    private playerService: PlayerService
  ) {}
  base64Image = "";

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
      nombreCompleto: ["", [Validators.required, Validators.minLength(3)]],
      edad: ["", [Validators.required, Validators.min(14), Validators.max(70)]],
      fechaNacimiento: [
        "",
        Validators.compose([Validators.required, DateValidator.dateValidator]),
      ],
      paisNacimiento: ["", [Validators.required]],
      lugarNacimiento: ["", [Validators.required]],
      demarcacion: ["", [Validators.required]],
      foto: ["", [Validators.required]],
    });

    this.playerCardService.selectedPlayer$.subscribe((player) => {
      this.selectedPlayer = player;

      if (!this.isEmpty(this.selectedPlayer)) {
        this.formPlayerInformation.patchValue({
          id: this.selectedPlayer.id,
          nombreCompleto: this.selectedPlayer.nombreCompleto,
          edad: this.selectedPlayer.edad,
          fechaNacimiento: moment(
            this.selectedPlayer.fechaNacimiento,
            "DD/MM/YYYY"
          ).toDate(),
          paisNacimiento: this.selectedPlayer.paisNacimiento,
          lugarNacimiento: this.selectedPlayer.lugarNacimiento,
          demarcacion: this.selectedPlayer.demarcacion,
          foto: this.selectedPlayer.foto,
        });
        this.base64Image = "data:image/jpeg;base64," + this.selectedPlayer.foto;
        this.optionCreatePlayer = false;
      }
    });
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
      data = data.split(",")[1];
      this.base64Image = "data:image/jpeg;base64," + data;
      this.formPlayerInformation.controls["foto"].setValue(file ? data : "");
    });
  }

  readyNewPlayer() {
    this.optionCreatePlayer = true;

    this.formPlayerInformation.reset();
    this.base64Image = "";
    this.playerService
      .getLastId()
      .subscribe((newId: number) =>
        this.formPlayerInformation.patchValue({ id: newId })
      );
  }

  readyNewUpdatePlayer() {
    this.optionCreatePlayer = false;
  }

  updatePlayer() {
    let newPlayer: IPlayer = this.formPlayerInformation.value;
    newPlayer = { ...newPlayer, foto: this.base64Image.split(",")[1] };
    newPlayer.fechaNacimiento = moment(newPlayer.fechaNacimiento).format(
      "DD/MM/YYYY"
    );
    console.log(newPlayer);

    this.playerService
      .updatePlayer(newPlayer)
      .subscribe((response: boolean) => {
        console.log(response);
      });
  }

  removePlayer() {
    const idPlayerToRemove = this.formPlayerInformation.value.id;
    this.playerService
      .removePlayer(idPlayerToRemove)
      .subscribe((res) => console.log(res));
  }

  createPlayer() {
    let newPlayer: IPlayer = this.formPlayerInformation.value;
    newPlayer = { ...newPlayer, foto: this.base64Image.split(",")[1] };
    newPlayer.fechaNacimiento = moment(newPlayer.fechaNacimiento).format(
      "DD/MM/YYYY"
    );
    console.log(newPlayer);

    this.playerService
      .createPlayer(newPlayer)
      .subscribe((response: boolean) => {
        console.log(response);
      });
  }

  isCreatePlayerOption() {
    return this.optionCreatePlayer;
  }

  showCurrentAction() {
    return this.optionCreatePlayer == true
      ? "Creando Jugador"
      : "Editando Jugador";
  }
}

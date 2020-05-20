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
  createPlayerOption: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private playerCardService: PlayerCardServiceService,
    private playerService: PlayerService
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
      nombreCompleto: ["", [Validators.required, Validators.minLength(3)]],
      edad: ["", [Validators.required, Validators.min(14), Validators.max(70)]],
      fechaNacimiento: [
        "",
        Validators.compose([Validators.required, DateValidator.dateValidator]),
      ],
      paisNacimiento: ["", [Validators.required]],
      lugarNacimiento: ["", [Validators.required]],
      demarcacion: ["", [Validators.required]],
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
        });
        this.srcURL = "data:image/jpeg;base64," + this.selectedPlayer.foto;
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
      console.log(data);
      data = data.split(",")[1];
      this.srcURL = "data:image/jpeg;base64," + data;
    });
  }

  readyNewPlayer() {
    this.createPlayerOption = true;

    this.formPlayerInformation.reset();
    this.srcURL = "";
    this.playerService
      .getLastId()
      .subscribe((newId: number) =>
        this.formPlayerInformation.patchValue({ id: newId })
      );
    //Todo: newplayer add photo and change keys to spanish
  }

  newUpdatePlayer() {
    this.createPlayerOption = false;
  }

  updatePlayer() {}

  removePlayer() {
    console.log(this.formPlayerInformation.value.id);
    const idPlayerToRemove = this.formPlayerInformation.value.id;
    this.playerService
      .removePlayer(idPlayerToRemove)
      .subscribe((res) => console.log(res));
  }

  createPlayer() {
    let newPlayer: IPlayer = this.formPlayerInformation.value;
    newPlayer = { ...newPlayer, foto: this.srcURL.split(",")[1] };
    newPlayer.fechaNacimiento = moment(newPlayer.fechaNacimiento).format(
      "DD/MM/YYYY"
    );
    console.log(newPlayer);
    /* let newPlayer=new Player(this.formPlayerInformation.);
    this.playerService.createPlayer(player:Player).subscribe((result) => {
      console.log(result);
    }); */
  }

  isCreatePlayerOption() {
    return this.createPlayerOption;
  }
}

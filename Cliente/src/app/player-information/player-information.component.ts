import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
} from "@angular/core";
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
  @Output() eventUpdatePlayer = new EventEmitter<Player>();
  @Output() eventRemovePlayer = new EventEmitter<Player>();
  @Output() eventCreatePlayer = new EventEmitter<Player>();
  @Output() readyNewPlayer$ = new EventEmitter<boolean>();
  @Input()
  optionCreatePlayer: boolean;

  formPlayerInformation: FormGroup;

  testImage: string;
  avatarSrc: string;
  public uploader: FileUploader = new FileUploader({
    url: "localhost:4200",
    disableMultipart: true,
  });

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
  }

  @Input()
  set selectedPlayer(currentPlayerSelected) {
    this.optionCreatePlayer = true;
    if (currentPlayerSelected) {
      this.formPlayerInformation.patchValue({
        ...currentPlayerSelected,
        fechaNacimiento: moment(
          currentPlayerSelected.fechaNacimiento,
          "DD/MM/YYYY"
        ).toDate(),
      });
      this.avatarSrc = `data:image/jpeg;base64,${this.formPlayerInformation.controls["foto"].value}`;
      this.optionCreatePlayer = false;
    }
  }

  /* reloadPlayers(event: Event): void {
    this.eventClicked.emit();
  } */

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
      console.log(typeof data);
      this.avatarSrc = "data:image/jpeg;base64," + data;
      this.formPlayerInformation.controls["foto"].setValue(file ? data : "");
    });
  }

  readyNewPlayer() {
    this.optionCreatePlayer = true;
    this.avatarSrc = "";
    this.formPlayerInformation.reset();
    this.showLastIdInForm();
  }

  showLastIdInForm() {
    this.playerService
      .getLastId()
      .subscribe((newId: number) =>
        this.formPlayerInformation.patchValue({ id: newId })
      );
  }

  updatePlayer() {
    let newPlayer: Player = this.formPlayerInformation.value;
    newPlayer = {
      ...newPlayer,
      foto: this.avatarSrc.split(",")[1],
      fechaNacimiento: moment(newPlayer.fechaNacimiento).format("DD/MM/YYYY"),
    };

    this.eventUpdatePlayer.emit(newPlayer);
    this.readyNewPlayer();
  }

  removePlayer() {
    // const idPlayerToRemove: number = this.formPlayerInformation.value.id;
    let newPlayer: Player = this.formPlayerInformation.value;
    newPlayer = {
      ...newPlayer,
      foto: this.avatarSrc.split(",")[1],
      fechaNacimiento: moment(newPlayer.fechaNacimiento).format("DD/MM/YYYY"),
    };
    this.eventRemovePlayer.emit(newPlayer);
    this.readyNewPlayer();
  }

  createPlayer() {
    let newPlayer: Player = this.formPlayerInformation.value;
    newPlayer = {
      ...newPlayer,
      foto: this.avatarSrc.split(",")[1],
      fechaNacimiento: moment(newPlayer.fechaNacimiento).format("DD/MM/YYYY"),
    };
    this.eventCreatePlayer.emit(newPlayer);
    this.readyNewPlayer();
  }

  showCurrentAction() {
    return this.optionCreatePlayer ? "Creando Jugador" : "Editando Jugador";
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Player } from "src/models/player";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { PlayerService } from "src/services/player.service";
import { Base64Service } from "src/services/base64.service";
import * as moment from "moment";
import { CustomValidator } from "src/validators/custom.validator";
@Component({
  selector: "app-player-information",
  templateUrl: "./player-information.component.html",
  styleUrls: ["./player-information.component.css"],
})
export class PlayerInformationComponent implements OnInit {
  @Output() onUpdatePlayer = new EventEmitter<Player>();
  @Output() onRemovePlayer = new EventEmitter<Player>();
  @Output() onCreatePlayer = new EventEmitter<Player>();
  @Output() readyNewPlayer$ = new EventEmitter<boolean>();
  @Input() optionCreatePlayer: boolean;
  formPlayerInformation: FormGroup;
  testImage: string;
  avatarSrc: string;

  public uploader: FileUploader = new FileUploader({
    url: "localhost:4200",
    disableMultipart: true,
  });

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private base64Service: Base64Service
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
    this.showLastIdInForm();
    this.formPlayerInformation = this.formBuilder.group({
      id: [],
      nombreCompleto: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      edad: ["", [Validators.required, Validators.min(14), Validators.max(70)]],
      fechaNacimiento: [
        "",
        Validators.compose([
          Validators.required,
          CustomValidator.dateValidator,
        ]),
      ],
      paisNacimiento: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      lugarNacimiento: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      demarcacion: ["", [Validators.required]],
      foto: ["", [Validators.required]],
      equipo: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
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

  onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];

    this.base64Service.readBase64(file).then((photo: string) => {
      const base64 = photo.split(",")[1];
      this.avatarSrc = "data:image/jpeg;base64," + base64;
      this.formPlayerInformation.controls["foto"].setValue(file ? base64 : "");
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
    const playerFormData = this.formPlayerInformation.value;
    const newPlayer = new Player({
      ...playerFormData,
      foto: this.avatarSrc.split(",")[1],
      fechaNacimiento: moment(playerFormData.fechaNacimiento).format(
        "DD/MM/YYYY"
      ),
    });

    this.onUpdatePlayer.emit(newPlayer);
    this.readyNewPlayer();
  }

  removePlayer() {
    const playerFormData = this.formPlayerInformation.value;
    const newPlayer = new Player({
      ...playerFormData,
      foto: this.avatarSrc.split(",")[1],
      fechaNacimiento: moment(playerFormData.fechaNacimiento).format(
        "DD/MM/YYYY"
      ),
    });

    this.onRemovePlayer.emit(newPlayer);
    this.readyNewPlayer();
  }

  createPlayer() {
    const playerFormData = this.formPlayerInformation.value;
    const newPlayer = new Player({
      ...playerFormData,
      foto: this.avatarSrc.split(",")[1],
      fechaNacimiento: moment(playerFormData.fechaNacimiento).format(
        "DD/MM/YYYY"
      ),
    });

    this.onCreatePlayer.emit(newPlayer);
    this.readyNewPlayer();
  }

  showCurrentAction() {
    return this.optionCreatePlayer ? "Creando" : "Editando";
  }
}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { PlayerService } from "../../services/player.service";
import { Player } from "src/models/player";
import { Observable } from "rxjs";
@Component({
  selector: "app-player-list",
  templateUrl: "./player-list.component.html",
  styleUrls: ["./player-list.component.css"],
})
export class PlayerListComponent implements OnInit {
  editMessage: string;
  selectedPlayer: Player;

  @Output() cardClicked = new EventEmitter<Player>();

  @Input()
  players: Player[];

  constructor() {}
  ngOnInit() {}

  emitClickedPlayerData(player: Player): void {
    this.cardClicked.emit(player);
  }
}

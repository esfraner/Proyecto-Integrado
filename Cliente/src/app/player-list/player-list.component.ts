import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Player } from "src/models/player";
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

  onClickPlayerCard(player: Player): void {
    this.cardClicked.emit(player);
  }
}

import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Player } from "src/models/player";
import { PageEvent } from "@angular/material/paginator";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  constructor() {}
  pageSize: number = 10;
  index: number = 0;
  minIndex: number = 0;
  maxIndex: number = 10;
  formPlayerInformation: FormGroup;
  selectedPlayer: Player;

  @Input() players$: Player[];
  @Output() onUpdatePlayer = new EventEmitter<Player>();
  @Output() onRemovePlayer = new EventEmitter<Player>();
  @Output() onCreatePlayer = new EventEmitter<Player>();

  ngOnInit(): void {}

  eventPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.minIndex = event.pageIndex * this.pageSize;
    this.maxIndex = event.pageIndex * this.pageSize + this.pageSize;
  }

  getPlayerClicked(player: Player) {
    this.selectedPlayer = player;
  }

  updatePlayer(updatedPlayer: Player) {
    this.onUpdatePlayer.emit(updatedPlayer);
  }

  createPlayer(createdPlayer: Player) {
    this.onCreatePlayer.emit(createdPlayer);
  }

  removePlayer(removedPlayer: Player) {
    this.onRemovePlayer.emit(removedPlayer);
  }
}

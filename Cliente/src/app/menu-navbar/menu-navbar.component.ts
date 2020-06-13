import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TEAMS } from "src/assets/constants/teams";
import { ITeams } from "src/models/ITeams";
import { IPlayer } from "src/models/IPlayer";

@Component({
  selector: "app-menu-navbar",
  templateUrl: "./menu-navbar.component.html",
  styleUrls: ["./menu-navbar.component.css"],
})
export class MenuNavbarComponent implements OnInit {
  teams: Array<ITeams>;
  @Output() eventGetPlayers = new EventEmitter<string>();
  constructor() {
    this.teams = TEAMS;
  }

  selectTeam(teamName: string) {
    this.eventGetPlayers.emit(teamName);
  }

  ngOnInit(): void {}
}

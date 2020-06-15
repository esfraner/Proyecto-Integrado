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
  @Output() onSelectTeam = new EventEmitter<string>();
  @Output() onSortbyAge = new EventEmitter<string>();
  @Output() onSortbyName = new EventEmitter<string>();
  @Output() onSortbyId = new EventEmitter<string>();
  constructor() {
    this.teams = TEAMS;
  }

  selectTeam(teamName: string) {
    this.onSelectTeam.emit(teamName);
  }

  sortByName() {
    this.onSortbyName.emit();
  }

  sortByAge() {
    this.onSortbyAge.emit();
  }

  sortById() {
    this.onSortbyId.emit();
  }

  ngOnInit(): void {}
}

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TEAMS } from "src/assets/constants/teams";
import { ITeams } from "src/models/ITeams";
@Component({
  selector: "app-menu-teams",
  templateUrl: "./menu-teams.component.html",
  styleUrls: ["./menu-teams.component.css"],
})
export class MenuTeamsComponent implements OnInit {
  teams: Array<ITeams>;
  @Output() onSelectTeam = new EventEmitter<string>();
  @Output() onSortbyAge = new EventEmitter();
  @Output() onSortbyName = new EventEmitter();
  @Output() onSortbyId = new EventEmitter();
  @Output() onKeyUp = new EventEmitter<string>();
  @Output() refreshPlayers = new EventEmitter();
  @Output() onRefreshPage = new EventEmitter();

  constructor() {
    this.teams = TEAMS;
  }

  ngOnInit(): void {}

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

  refreshPage() {
    this.onRefreshPage.emit();
  }

  searchPlayer(event: any) {
    if (this.isKeyRemove(event.keyCode)) {
      this.refreshPlayers.emit();
    }
    this.onKeyUp.emit(event.target.value);
  }

  isKeyRemove(keyCode: number) {
    return keyCode === 8;
  }
}

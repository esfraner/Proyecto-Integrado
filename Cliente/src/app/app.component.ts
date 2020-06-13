import { Component, Output } from "@angular/core";
import { PlayerService } from "src/services/player.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @Output()
  team = "Betis";
  @Output()
  players$ = this.playerService.getPlayers(this.team);

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  selectTeam(team: string) {
    this.players$ = this.playerService.getPlayers(team);
  }
}

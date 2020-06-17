import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { Player } from "src/models/player";
import { PageEvent } from "@angular/material/paginator";
import { FormGroup } from "@angular/forms";
import { PlayerService } from "src/services/player.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  constructor(private playerService: PlayerService) {}
  pageSize: number = 10;
  index: number = 0;
  minIndex: number = 0;
  maxIndex: number = 10;
  formPlayerInformation: FormGroup;
  selectedPlayer: Player;

  @Input() players$: Player[];
  @Input() sort: { property: string; isAscendent: boolean };
  @Input() searchName: string;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.players$ && this.sort) {
      this.sortPlayersByProperty(this.sort.property, this.sort.isAscendent);
    }
    if (this.searchName) {
      this.searchPlayer(this.searchName);
    }
  }

  eventPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.minIndex = event.pageIndex * this.pageSize;
    this.maxIndex = event.pageIndex * this.pageSize + this.pageSize;
  }

  getPlayerClicked(player: Player) {
    this.selectedPlayer = player;
  }

  searchPlayer(name: string) {
    this.players$ = this.players$.filter((player: Player) =>
      player.nombreCompleto.includes(name)
    );
  }

  updatePlayer(updatedPlayer: Player) {
    this.playerService.updatePlayer(updatedPlayer).subscribe(() => {
      this.players$ = this.players$.map((player: Player) => {
        return this.isEqualsID(player.id, updatedPlayer.id)
          ? updatedPlayer
          : player;
      });
    });
  }

  createPlayer(createdPlayer: Player) {
    this.playerService
      .createPlayer(createdPlayer)
      .subscribe((response: boolean) => {
        if (response) {
          this.players$ = [...this.players$, createdPlayer];
        }
      });
  }

  removePlayer(removedPlayer: Player) {
    this.playerService
      .removePlayer(removedPlayer)
      .subscribe((response: boolean) => {
        if (response) {
          this.players$ = this.players$.filter((player: Player) => {
            return !this.isEqualsID(player.id, removedPlayer.id);
          });
        }
      });
  }

  sortPlayersByProperty(property: string, isAscendent: boolean) {
    this.players$ = this.players$.sort((a, b) =>
      isAscendent
        ? this.ascendentSorting(a, b, property)
        : this.descendentSorting(a, b, property)
    );
  }

  ascendentSorting(a: Player, b: Player, property: string): number {
    if (this.isPropertyNombreCompleto(property)) {
      const firstParameter = this.normalizeStringAccent(a[property]);
      const lastParameter = this.normalizeStringAccent(b[property]);

      return this.isAscendent(firstParameter, lastParameter) ? -1 : 1;
    } else {
      return this.isAscendent(a[property], b[property]) ? -1 : 1;
    }
  }

  descendentSorting(a: Player, b: Player, property: string): number {
    if (this.isPropertyNombreCompleto(property)) {
      const firstParameter = this.normalizeStringAccent(a[property]);
      const lastParameter = this.normalizeStringAccent(b[property]);

      return this.isDescendent(firstParameter, lastParameter) ? -1 : 1;
    } else {
      return this.isDescendent(a[property], b[property]) ? -1 : 1;
    }
  }

  normalizeStringAccent(name: string): string {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  isEqualsID(idPlayer1: string, idPlayer2: string) {
    return idPlayer1 === idPlayer2;
  }

  isPropertyNombreCompleto(property: string) {
    return property === "nombreCompleto";
  }

  isAscendent(first: string, last: string) {
    return first < last;
  }

  isDescendent(first: string, last: string) {
    return first > last;
  }

  isEquals2(name: string): boolean {
    return name.length > 2;
  }
}

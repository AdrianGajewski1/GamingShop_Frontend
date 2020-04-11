import { Component, OnInit } from "@angular/core";
import { GameService } from "../../shared/Services/game.service";
import { GameIndexModel } from "../../shared/Models/game-index-model";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  public games: GameIndexModel[];
  searchQuery: string;
  dataLoaded = false;
  constructor(private service: GameService) {}

  ngOnInit() {
    if (localStorage.getItem("searchQuery") != null)
      this.searchQuery = JSON.parse(localStorage.getItem("searchQuery"));

    if (this.searchQuery == "" || this.searchQuery == undefined) {
      this.games = this.getGames();
    } else {
      this.service
        .getGamesBySearchQuery(this.searchQuery)
        .subscribe(
          (response) => ((this.games = response), (this.dataLoaded = true))
        );
    }

    localStorage.removeItem("searchQuery");
  }

  getGames(): GameIndexModel[] {
    let model: GameIndexModel[] = [];

    this.service.getGames().subscribe((response) => {
      response.forEach((element) => {
        model.push(element);
        this.dataLoaded = true;
      });
    });

    return model;
  }
}
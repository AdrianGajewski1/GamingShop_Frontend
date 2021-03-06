import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../../shared/Services/cart.service";
import { ToastrService } from "node_modules/ngx-toastr";

@Component({
  selector: "app-game-item",
  templateUrl: "./game-item.component.html",
  styleUrls: ["./game-item.component.css"],
})
export class GameItemComponent implements OnInit {
  @Input() gameDetails;
  imagePath: string;
  userSignedIn: boolean;
  constructor(
    private router: Router,
    private service: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.imagePath = "../../assets/img/" + this.gameDetails.ImageUrl;

    this.userSignedIn = localStorage.getItem("token") != null;
  }

  goToDetails(id: number): void {
    this.router.navigate(["details", id]);
  }

  addToCart() {
    if (this.userSignedIn) {
      this.service
        .addToCart(this.gameDetails.ID)
        .subscribe((res) => console.log("OK"));
      this.toastr.success("Your item has been addded to your cart !!");
    } else {
      this.router.navigateByUrl("login");
    }
  }
}

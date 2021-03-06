import { Component, OnInit, OnChanges } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../../shared/Services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private service: UserService, private router: Router) {}
  searchForm: FormGroup;
  searchQuery: string;
  search() {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(),
    });
  }
  goToHome() {
    this.router.navigateByUrl("/games");
  }
  updateSearchQuery(): void {
    this.searchQuery = this.searchForm.get("searchInput").value;
  }

  onSubmit(): void {
    if (this.router.url == "/games" || this.router.url == "/") {
      localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
      window.location.reload();
    } else {
      localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
      this.router.navigateByUrl("/games");
    }
  }

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("UserID");
    window.location.reload();
  }

  goToMessages() {
    this.router.navigateByUrl("/messages");
  }
}

import { Component } from '@angular/core';
import { AnimalListComponent } from "../animal-list/animal-list";

@Component({
  selector: 'app-home',
  imports: [AnimalListComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

}

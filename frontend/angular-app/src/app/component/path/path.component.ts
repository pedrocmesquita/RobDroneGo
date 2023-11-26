import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";
import { PathService } from "../../services/path.service";

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrl: './path.component.css'
})
export class PathComponent {
  originB: string = '';
  destB: string = '';
  originF: string = '';
  destF: string = '';
  originX: string = '';
  originY: string = '';
  destX: string = '';
  destY: string = '';
  pathResult: string = '';
  constructor(private pathService: PathService) {}

  onSubmit(): void {
    this.pathService.getPl(this.originB, this.destB, this.originF, this.destF, this.originX, this.originY, this.destX, this.destY).subscribe(
      (response) => {
        console.log(response);
        this.pathResult = response;
      },
      (error) => {
        console.log("ERRO.");
        console.error('Failed to fetch path:', error);
      }
    );
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { RocketService } from '../../../_services/rocket.service';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.scss']
})
export class RocketComponent implements OnInit {

  @Input() name: string;
  @Input() image: string;
  @Input() id: number;
  @Input() boosters: number;
  @Input() costPerLaunch: number;
  @Input() active: boolean;
  @Input() favorite: boolean;
  private isFavorite: boolean;
  

  constructor(private rocketService: RocketService) {
    this.name = "NoName Rocket",
    this.image = "/assets/default_rocket.png";
    this.id = 0;
    this.boosters = this.costPerLaunch = 0;
    this.active = this.favorite = false;
  }

  ngOnInit() {
  }

  onFavorite(){
  	this.rocketService.chageFavoriteStatus(this.id)
     .subscribe(res => {
        if(this.favorite) {
          this.favorite = false;
        } else {
          this.favorite = true;
        }
      }, error => {
        console.error(error);
      });;
  }
}

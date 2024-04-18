import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lesDestinations:any;
  lesVoitures:any;
  lesChauffeurs:any;

  constructor(private router : Router, private http:HttpClient) {
    let env = this
    this.http.get("http://192.168.54.10/Localux/api/destinations").subscribe((data:any) => {
      env.lesDestinations = data['hydra:member']
    })
    this.http.get("http://192.168.54.10/Localux/api/voitures").subscribe((data:any) => {
      env.lesVoitures = data['hydra:member']
    })
    this.http.get("http://192.168.54.10/Localux/api/chauffeurs").subscribe((data:any) => {
      env.lesChauffeurs = data['hydra:member']
    })
  }
}

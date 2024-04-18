import { Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lesDestinations:any;
  lesVoitures:any;
  lesChauffeurs:any;
  idUtilisateur:any = -1;

  constructor(private router : Router, private http:HttpClient, private activatedRoute: ActivatedRoute, public ToastController: ToastController) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      let navigation: any = this.router.getCurrentNavigation()?.extras.state;
      this.idUtilisateur = navigation.idUtilisateur;
      console.log(this.idUtilisateur)
  }
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

  getLoginPage() {
    this.router.navigate(['/login'])
  }

  addReservation() {
    if (this.idUtilisateur == -1) {
      this.ToastController.create({
        message: "Vous devez vous connecter avant de pouvoir réserver",
        position: "top",
        color: "danger",
        duration: 3000,
      }).then((toast) => toast.present())
    }
  }
}

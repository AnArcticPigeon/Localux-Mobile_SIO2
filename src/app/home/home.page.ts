import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lesDestinations: any
  lesVoitures: any
  lesChauffeurs: any
  idUtilisateur: any
  selectedDate:any
  selectedChauffeurId:any
  selectedVoitureId:any
  selectedVilleDepartId:any
  selectedVilleArriveId:any

  constructor(private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute, public ToastController: ToastController) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      let navigation: any = this.router.getCurrentNavigation()?.extras.state;
      this.idUtilisateur = navigation.idUtilisateur;
      console.log(this.idUtilisateur)
    }
    let env = this
    this.http.get("http://192.168.54.10/Localux/api/destinations").subscribe((data: any) => {
      env.lesDestinations = data['hydra:member']
    })
    this.http.get("http://192.168.54.10/Localux/api/voitures").subscribe((data: any) => {
      env.lesVoitures = data['hydra:member']
    })
    this.http.get("http://192.168.54.10/Localux/api/chauffeurs").subscribe((data: any) => {
      env.lesChauffeurs = data['hydra:member']
    })

  }

  getCurrentDate(): string {
    const currentDate = new Date();
  
    // Get the date components
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-indexed
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
  
    return formattedDate;
  }

  addReservation() {
    let data = {
      "destinationDepart": "/Localux/api/destinations/" + this.selectedVilleDepartId,
      "destinationArriver" : "/Localux/api/destinations/" + this.selectedVilleArriveId,
      "lechauffeur" : "/Localux/api/chauffeurs/" + this.selectedChauffeurId,
      "datereservation" : this.getCurrentDate(),
      "dateDebutReservation" : this.selectedDate + ".000Z",
      "laVoiture" : "/Localux/api/voitures/" + this.selectedVoitureId,
      "leClient" : "/Localux/api/utilisateurs/" + this.idUtilisateur
    }
    console.log(data)
    return this.http.post('http://192.168.54.10/Localux/api/reservation_chauffeurs', data);
  }
}

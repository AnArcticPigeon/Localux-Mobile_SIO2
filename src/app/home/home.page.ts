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
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;
  
    return formattedDate;
  }

  convertDateTimeFormat(dateTimeString:any) {
    // Split the date and time parts
    const parts = dateTimeString.split('T');
    
    // Date part will be at index 0, time part at index 1
    const datePart = parts[0];
    const timePart = parts[1];

    // Split the time part to get hours, minutes, and seconds
    const timeParts = timePart.split(':');
    
    // Concatenate date part with time part using a space
    const formattedDateTime = `${datePart} ${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
    
    return formattedDateTime;
}

  addReservation() {
    let data = {
      "destinationDepart": this.selectedVilleDepartId,
      "destinationArriver" : this.selectedVilleArriveId,
      "lechauffeur" : this.selectedChauffeurId,
      "datereservation" : this.getCurrentDate(),
      "dateDebutReservation" : this.convertDateTimeFormat(this.selectedDate),
      "laVoiture" : this.selectedVoitureId,
      "leClient" : this.idUtilisateur
    }
    return this.http.get('http://192.168.54.10/Localux/reservation/add/'+this.selectedVilleDepartId+'/'+this.selectedVilleArriveId+'/'+this.selectedChauffeurId+'/'+this.getCurrentDate()+'/'+this.convertDateTimeFormat(this.selectedDate)+'/'+this.selectedVoitureId+'/'+this.idUtilisateur).subscribe((data:any) => {
      this.ToastController.create({
        message: data.errcode?"Reservation enregistrée avec succès":"Une erreur s'est produite",
        position: "top",
        color: data.errcode?"success":"danger",
        duration: 3000,
      }).then((toast) => toast.present())
      console.log(data)
    });
  }
}

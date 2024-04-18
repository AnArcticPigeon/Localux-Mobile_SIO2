import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  lesUtilisateurs:any
  mdp:any
  email:any

  

  constructor(private router: Router, private http: HttpClient, public ToastController: ToastController) {
    let env = this
    this.http.get("http://192.168.54.10/Localux/api/utilisateurs").subscribe((data: any) => {
      env.lesUtilisateurs = data['hydra:member']
    })
  }

  validerConnexion(email:any, mdp:any) {
    let env = this
    this.http.get("http://192.168.54.10/Localux/login/verify/" + email + "/" + mdp).subscribe((data:any) => {
      this.ToastController.create({
        message: data.errcode?"Erreur, Email ou mot de passe incorrect":"Utilisateur connecté avec succès",
        position: "top",
        color: data.errcode?"danger":"success",
        duration: 3000,
      }).then((toast) => toast.present())
      if (data.errcode == 0) {
        let NavigationExtras : NavigationExtras = {
          state : {
            idUtilisateur : data.id
          }
        };
        this.router.navigate(['/home'], NavigationExtras)
      }
    })
  }
}

import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TriviaService } from '../services/trivia-services';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username;

  constructor(public alertController: AlertController, public router: Router, private service: TriviaService) {
    // this.nativeAudio.preloadSimple('goles', '../../assets/audio/1.mp3');
  }

  ngOnInit() {


    const userActive = localStorage.getItem('username');
    if (userActive) {
      this.router.navigate(['/menu'])
    }
  }

  consultPlayer() {
    this.service.getUser(this.username)
      .then(response => {
        if (response.success) {
          // this.nativeAudio.play('goles');
          // localStorage.setItem('username', this.username);
          // this.router.navigate(['/menu'])
          this.existPlayer('El nickname ingresadso ya se encuentra en uso')

        } else {
          this.crearUsuarios();
        }
      })
      .catch(error => {
        console.log(error.error.nickname);
      });
  }


  crearUsuarios() {

    this.service.createUsers({ nickname: this.username }).then((result) => {
      if (result['success']) {
        localStorage.setItem('username', this.username);
        this.router.navigate(['/menu'])
      }
    }).catch((err) => {
      console.log(err.error[0]);


    });
  }

  async existPlayer(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ATENCIÓN !',
      // subHeader: 'Informacion',
      message: message,
      buttons: [
        {
          text: 'CONTINUAR',
          handler: () => {
          }
        }],

    });

    await alert.present();
  }
}

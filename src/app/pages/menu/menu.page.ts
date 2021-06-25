import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { element } from 'protractor';
import { TriviaService } from '../../services/trivia-services';
import { PopoverController, NavController } from '@ionic/angular';
// import { PopoverComponent } from '../../component/popover/popover.component';
import { TutorialesPage } from '../tutoriales/tutoriales.page';
import { TutorialesComponent } from '../tutoriales/tutoriales.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categoria;
  userActive;
  tutorial = [];
  penalti = [];
  mapamundi = [];
  tutorialActual = 1;
  elementos;
  partidosGanados = '../../assets/img/categoria.svg'
  partidos = '../../assets/img/categoria.svg'
  arrayCategoriaPartidos = 0;
  tutorialPopup;

  arrayPublicidad = [
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png",
  ]


  idUser;
  dificultadBot: String = "Baja";
  porcentajeGlobal;

  text: string = 'Hola! Estoy jugando Trivia Penalty Crack. Regístrate  y juega';
  textUrl = null;
  imgurl: string = 'https://cdn.pixabay.com/photo/2019/12/26/05/10/pink-4719682_960_720.jpg';
  link: string = 'https://link.medium.com/JA4amAHFJ5';



  constructor(private service: TriviaService, public router: Router, private nativeAudio: NativeAudio,
    public popoverController: PopoverController, private socialSharing: SocialSharing, private navigate: NavController) { }



  ShareGeneric(parameter) {
    const url = this.link
    const text = parameter + '\n'
    this.socialSharing.share(text, 'MEDIUM', null, url)
  }

  ShareWhatsapp() {
    this.socialSharing.share(this.text, this.textUrl, this.imgurl, this.link)
  }

  ngOnInit() {
    console.log("DE NUEVO ");

    console.log(this.arrayPublicidad);

    // var slider = document.querySelector(".slier-prin");
    // slider.innerHTML += slider.innerHTML;

    this.tutorialPopup = localStorage.getItem('tutorial-mapamundi');


    var array = ['a', 'b', 'a', 'c', 'a', 'd'];

    console.log(array.includes('a'));

    // this.tutoriales(event);
    // this.presentPopover();

    // const partidos = localStorage.getItem('partidosGanados');



    this.nativeAudio.preloadComplex('musica', 'assets/audio/1.mp3', 1, 1, 0).then(() => {
      this.nativeAudio.play('musica');
      this.nativeAudio.loop('musica');
    });
    this.userActive = localStorage.getItem('username');

    // CONSUMO USUARIOS

    this.service.getUser(this.userActive).then((result) => {
      console.log("USUARIO", result);
      this.idUser = result.player.id;
      console.log(this.idUser);
      this.consultIdUSer();

    }).catch((err) => {
      console.log(err);

    });



    this.service.consultarCategoriaActual(this.userActive).then((result) => {
      console.log("CATEGORIA --- ", result);
      this.categoria = result['categories'];

      for (let index = 0; index < this.categoria.length; index++) {
        const element = this.categoria[index]['plays'];

        if (element.length > 0) {
          for (let index = 0; index < element.length; index++) {
            const elemento = element[index].win;

            if (elemento == 1) {
              this.arrayCategoriaPartidos++;

              console.log(this.arrayCategoriaPartidos);

              switch (true) {
                // case this.arrayCategoriaPartidos == 0:
                //   this.dificultadBot = "Baja";
                //   break;
                case this.arrayCategoriaPartidos == 1:
                  this.partidosGanados = '../../assets/img/categoria1.svg',
                    this.dificultadBot = "Media";
                  break;
                case this.arrayCategoriaPartidos == 2:
                  this.partidosGanados = '../../assets/img/categoria2.svg'
                  this.dificultadBot = "Alta";
                  break;
                case this.arrayCategoriaPartidos == 3:
                  this.partidosGanados = '../../assets/img/categoria3.svg'
                  this.dificultadBot = "Baja";

                  break;
              }
            } else {
              // this.dificultadBot = "Baja";
            }
          }
        }
      }

    }).catch((err) => {
      console.log(err);
    });

    this.service.consultarTutoriales().then((result) => {

      this.tutorial = result['tutorials'];
      console.log("TUTORIALES", this.tutorial);
      if (this.tutorial.length > 0) {
        if (this.tutorialPopup != '1') {
          this.presentPopover();
        }
      }
    })

  }


  // ShareWhatsapp() {
  //   //  this.socialSharing.share(this.text, this., this.imgurl, this.link)
  //   this.socialSharing.share(this.text, this.imgurl, this.link).then((response) => {
  //     console.log(response);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  consultIdUSer() {
    this.service.consultarProgreso(1, this.idUser).then((result) => {
      this.porcentajeGlobal = result['globalPercentage']

    }).catch((err) => {
      console.log(err);

    });
  }


  async presentPopover() {
    for (let index = 0; index < this.tutorial.length; index++) {
      this.elementos = this.tutorial[index];

      if (this.elementos.screen.includes('Penalti')) {
        this.penalti.push(this.elementos.text)

      } else {
        this.mapamundi.push(this.elementos.text)

      }
    }


    const popover = await this.popoverController.create({
      component: TutorialesComponent,
      cssClass: 'my-custom-class',
      // event: e,
      translucent: true,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: { text: this.mapamundi, tut: '0' }

    });
    await popover.present();
  }


  season(categoria, idCategoria) {
    console.log(this.dificultadBot);

    if (categoria.type != 'Trofeo') {
      const data = {
        categoryId: idCategoria,
        nickname: this.userActive
      }

      this.service.desbloquearCategoria(data).then((result => {
        console.log(result);
      })).catch((err => {
        console.log(err);
      }))

      const navigationExtras: NavigationExtras = {
        queryParams: {
          idCategoria: idCategoria,
          categoria: categoria.name,
          tutoriales: this.penalti,
          dificultadBot: this.dificultadBot
        }
      };

      this.navigate.navigateForward(['/season'], navigationExtras)
    }
    else {
      alert("Categoria Bloqueada")
    }


  }

  ngOnDestroy() {
    this.router.navigate(['/season']);
    console.log("Se eliminó el grupo DRAGULA");
  }

}

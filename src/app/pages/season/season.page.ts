import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, NavController } from '@ionic/angular';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TriviaService } from '../../services/trivia-services';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TutorialesComponent } from '../tutoriales/tutoriales.component';
import $ from "jquery";


@Component({
  selector: 'app-season',
  templateUrl: './season.page.html',
  styleUrls: ['./season.page.scss'],
})
export class SeasonPage implements OnInit {

  audio: HTMLAudioElement = new Audio();
  tutorial;
  tutorialActual = 1;
  tutorialPopup
  preguntas;
  respuestas;
  questionTime;
  buton = "../../assets/img/boton-preguntas.svg";
  buttonTrue = "../../assets/img/boton-verde.svg";
  buttonFalse = "../../assets/img/boton-rojo.svg";
  balones = "../../assets/img/balon.svg";
  boton: boolean = true;
  reloj: boolean = true;
  empate: boolean = false;
  answerUltimoPenalti;
  jugadores: boolean = true;
  date = new Date('2020-01-01 00:00:20');
  padLeft = n => "00".substring(0, "00".length - n.length) + n;
  userActive;
  questionsList = [];
  questionsListUltimoPenalty = [];
  questionActual = 1;
  idQuestion;
  continueNext;
  iconoBalon;
  animacion;
  animavionJugador;
  myNumeroAleatorio;
  myArray = [this.balones, this.balones, this.balones, this.balones, this.balones];
  myArrayCPU = [this.balones, this.balones, this.balones, this.balones, this.balones];
  partido: any = [];
  tutoriales;
  penalti = [];
  dificultadBot;
  animacionesFallo = [
    // '../../../assets/gifs/Ataja-D.gif',
    // '../../../assets/gifs/Ataja-I.gif',
    // '../../../assets/gifs/fallaste1.gif',
    '../../../assets/gifs/Palo-IS.gif',
    '../../../assets/gifs/Palo-DS.gif',
    // '../../../assets/gifs/Falla-S.gif'
  ]
  animacionesGol = [
    '../../../assets/gifs/Cabeza-IS.gif',
    '../../../assets/gifs/Gol-DS.gif',
    '../../../assets/gifs/Gol-IS.gif'
  ]

  arrayPublicidad = [
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png",
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png",
  ]

  puntaje = 0
  puntajeCPU = 0
  prueba: boolean = false;
  category;
  idCategory;
  intervalArquero
  indice = 0;


  ganados = 1;

  constructor(private service: TriviaService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public router: Router,
    public modalController: ModalController,
    private nativeAudio: NativeAudio,
    private navigate: NavController,
    public popoverController: PopoverController
  ) {

    this.route.queryParams.subscribe(params => {
      this.idCategory = params.idCategoria;
      this.category = params.categoria;
      this.penalti = params.tutoriales;
      this.dificultadBot = params.dificultadBot

      console.log("vienen parametros", params);
    });



  }

  ngOnInit() {

    this.service.consultarPublicidad().then((result) => {
      for (let index = 0; index < result['advertisings'].length; index++) {
        const element = result['advertisings'][index].file;
        this.arrayPublicidad.push(element)
      }
      console.log(this.arrayPublicidad);
    }).catch((err) => {
      console.log(err);

    });

    // this.service.consultarTutoriales().then((result) => {

    //   this.tutorial = result['tutorials'];
    //   console.log("TUTORIALES", this.tutorial);

    //   if (this.tutorialPopup != '1') {
    //     this.presentPopover();
    //   }



    console.log("penalti", this.penalti);



    // for (let index = 0; index < result['tutorials'].length; index++) {
    //   const element = result['tutorials'][index];
    //   if (element.screen == 'Mapamundi') {
    //     console.log("elemento", element.identifier);
    //     console.log("tutoriales", element.text);
    //     // if (element.identifier === 'TUT-4'){
    //       this.tutorial = element.identifier
    //     // }
    //   }
    //   // console.log("tutoriales", element.screen == 'Penalti' );
    // }
    // })

    this.tutorialPopup = localStorage.getItem('tutorial-mapamundi');

    this.nativeAudio.preloadComplex('fallo', 'assets/audio/fallo.wav', 1, 1, 0);
    this.nativeAudio.preloadComplex('gol', 'assets/audio/gol.wav', 1, 1, 0);
    this.nativeAudio.preloadComplex('pito', 'assets/audio/pito.wav', 1, 1, 0);
    this.nativeAudio.preloadComplex('victoria', 'assets/audio/celebraciónVictoria.wav', 1, 1, 0);
    this.nativeAudio.preloadComplex('pierde', 'assets/audio/pierdePartido.wav', 1, 1, 0);
    this.nativeAudio.preloadComplex('musica', 'assets/audio/musicaFondo.wav', 1, 1, 0);
    this.nativeAudio.preloadComplex('reloj', 'assets/audio/TicTac.wav', 1, 1, 0);

    this.userActive = localStorage.getItem('username');
    const partidos = localStorage.getItem('partidosGanados');

    if (this.penalti.length > 0) {
      if (this.tutorialPopup != '1') {
        this.presentPopover();
      }
    }

    this.ganados = parseInt(partidos);


    this.preguntasRespuestas();

  }

  async presentPopover() {

    console.log("TUT PENALTY", this.penalti);



    const popover = await this.popoverController.create({
      component: TutorialesComponent,
      cssClass: 'my-custom-class',
      // event: e,
      translucent: true,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: { text: this.penalti, tut: '1' }

    });
    await popover.present();
  }



  preguntasRespuestas() {
    this.jugadores = true;
    setTimeout(() => {
      this.nativeAudio.play('pito');
      this.date = new Date('2020-01-01 00:00:20');
      // this.reloj = false
      this.service.consultarPreguntas(this.idCategory, this.dificultadBot).then((result) => {
        console.log("PREGUNTAS", result);

        if (result['questions'].length > 0) {
          if (this.questionActual < 7) {
            this.questionsList = result['questions'].slice(0, 5);
            this.questionsListUltimoPenalty = result['questions'];

            console.log("PPPPP", this.questionsList[this.questionActual - 1].text);

            this.respuestas = result['questions'][0].answers;
          }
        } else {
          this.categoriaSinPreguntas();

        }
      }).catch((err) => {
        console.log(err);

      });
    }, 1000);

  }


  interval = setInterval(() => {
    // Asignqr el valor de segundos
    var seconds = this.padLeft(this.date.getSeconds() + "");
    this.questionTime = seconds;

    // Restarle a la fecha actual 1000 milisegundos
    this.date = new Date(this.date.getTime() - 1000);

    // Si llega a 2:45, eliminar el intervalo


    if (seconds == '05') {
      // this.nativeAudio.preloadComplex('reloj', 'assets/audio/TicTac.wav', 6, 6, 0).then(() => {
      this.nativeAudio.play('reloj')
      // });
    } else if (seconds == '00') {
      this.timeOut()
    } else {
      this.questionTime = seconds;
    }

    // seconds == '00' ? this.timeOut(false) : this.questionTime = seconds;

  }, 1000);

  timeOut() {
    this.saveQuestion(this.questionsList[this.questionActual - 1], false)
  }

  async categoriaSinPreguntas() {
    // clearInterval(this.interval);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Lo sentimos',
      message: `Esta categoria no contiene preguntas`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navigate.navigateForward('/menu');
          }
        }
      ]
    });
    await alert.present();
  }

  async partidoTerminado() {

    const dataPartido = {
      usuario: this.userActive,
      categoria: this.idCategory,
      golesUsuario: this.puntaje,
      golesCPU: this.puntajeCPU,
      partidoGanado: (this.puntaje > this.puntajeCPU),
      partidoEmpatado: (this.puntaje === this.puntajeCPU),
      dificultad: this.dificultadBot,
      partido: this.partido
    }

    console.log(dataPartido);

    this.service.saveData(dataPartido).then((result) => {
      console.log("ENVIO DE DATA", result);
      if (this.puntaje > this.puntajeCPU) {
        this.nativeAudio.play('victoria');
        this.presentModal();
      } else {
        this.animavionJugador = "../../../assets/gifs/Jugador-Pierde.gif"
        this.jugadores = false;
        this.nativeAudio.play('pierde')

        setTimeout(() => {
          this.navigate.navigateForward('/menu');
        }, 6000);
      }
    }).catch((err) => {
      console.log(err);
    });


  }


  saveQuestion(question, response) {
    console.log("RESPUESTA", response);

    if (this.empate) {
      this.partidoTerminado();
    }

    this.reloj = false;

    this.myNumeroAleatorio = Math.floor(Math.random() * 2)
    if (this.myNumeroAleatorio === 1) {
      setTimeout(() => {
        this.puntajeCPU++
        this.myArrayCPU[this.indice] = "../../assets/img/balon-verde.svg"

      }, 4000);
    } else {
      setTimeout(() => {
        this.myArrayCPU[this.indice] = "../../assets/img/balon-rojo.svg"
      }, 4000);
    }


    if (this.questionActual < 6 || this.answerUltimoPenalti != undefined) {

      if (question) {
        this.partido.push({
          question: question.id,
          answer: response ? response.id : null,
          valid: response ? response.valid : false
        });
      }

      this.reloj = false;

      this.relojGif();
      if (response.valid) {
        // this.buton = "../../assets/img/boton-verde.svg";
        // this.date = new Date('2020-01-01 00:00:20');
        this.jugadores = false;
        this.animavionJugador = "../../../assets/gifs/Jugador-gol-D.gif"
        this.animacionesRandom(this.animacionesGol);

        setTimeout(() => {
          // this.nativeAudio.preloadComplex('gol', 'assets/audio/gol.wav', 6, 6, 0).then(() => {
          this.nativeAudio.play('gol')
          // });
        }, 2000);

        setTimeout(() => {
          this.myArray[this.indice] = "../../assets/img/balon-verde.svg"
          this.indice++
          this.puntaje++;
          this.iconoBalon = "../../assets/img/balon-verde.svg";
          this.animacion = " ";
          this.animavionJugador = " ";
          this.jugadores = true
          this.nativeAudio.play('pito');
          this.date = new Date('2020-01-01 00:00:20');
          this.reloj = true;
        }, 4000);

      } else {

        // this.date = new Date('2020-01-01 00:00:20');
        this.jugadores = false;
        this.animavionJugador = "../../../assets/gifs/Jugaador-Falla-D.gif"
        this.animacionesRandom(this.animacionesFallo);

        setTimeout(() => {
          this.nativeAudio.play('fallo')
        }, 2000);


        setTimeout(() => {
          this.iconoBalon = "../../assets/img/balon-rojo.svg";
          this.myArray[this.indice] = "../../assets/img/balon-rojo.svg"
          this.indice++
          this.animacion = " ";
          this.animavionJugador = " ";
          this.jugadores = true
          this.nativeAudio.play('pito');
          this.date = new Date('2020-01-01 00:00:20');
          this.reloj = true;
        }, 4000);
      }

      if (this.questionsList.length === this.questionActual) {
        clearInterval(this.interval);

        setTimeout(() => {
          if (this.puntaje === this.puntajeCPU) {
            // this.partidoTerminado();
            alert("Partido Empatado, se definira en un ultimo cobro");
            this.empate = true;
            this.questionActual++;
            this.questionsList = this.questionsListUltimoPenalty.slice(5, 6);

            for (let index = 0; index < this.questionsList.length; index++) {
              const element = this.questionsList[index].answers;
              this.answerUltimoPenalti = element
            }

          } else {
            this.partidoTerminado();

          }

        }, 4000);
      }

      if (this.questionActual === 5) {
      } else {
        this.questionActual++;
        setTimeout(() => {
          if (this.questionsList[this.questionActual - 1]) {
            this.respuestas = this.questionsList[this.questionActual - 1].answers;
          }
        }, 4000);
      }
    }

  }

  animacionesRandom(arrayAnimaciones) {

    var item = arrayAnimaciones.find((_, i, ar) => Math.random() < 1 / (ar.length - i));
    this.animacion = item;
    console.log(item);
  }

  menu() {
    this.navigate.navigateForward('/menu');
  }

  presentModal() {
    this.router.navigate(['/celebracion']);
  }

  volumen() {
    this.nativeAudio.stop('musica')
  }

  relojGif() {
    {
      $('.img1').removeAttr('src', '');
    }
  }

}

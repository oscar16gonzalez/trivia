import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { TriviaService } from 'src/app/services/trivia-services';

@Component({
  selector: 'app-celebracion',
  templateUrl: './celebracion.page.html',
  styleUrls: ['./celebracion.page.scss'],
})
export class CelebracionPage implements OnInit {
  arrayPublicidad = [];

  constructor(public router: Router,
    private nativeAudio: NativeAudio,
    private service: TriviaService
  ) { }

  ngOnInit() {
    // this.audio.play();
    this.regresarMenu();

    this.service.consultarPublicidad().then((result) => {
      for (let index = 0; index < result['advertisings'].length; index++) {
        const element = result['advertisings'][index].file;
        this.arrayPublicidad.push(element)
      }
    }).catch((err) => {
      console.log(err);
    });
  }


  regresarMenu() {
    this.nativeAudio.preloadComplex('victoria', 'assets/audio/celebraciónVictoria.wav', 1, 1, 0).then(() => {
      this.nativeAudio.play('victoria')
    });
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 10000);
  }

  // private initAudio() {
  //   this.audio.src = `/assets/audio/celebraciónVictoria.wav`;
  //   this.audio.load();
  // }

}



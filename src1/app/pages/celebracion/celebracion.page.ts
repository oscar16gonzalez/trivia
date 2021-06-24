import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-celebracion',
  templateUrl: './celebracion.page.html',
  styleUrls: ['./celebracion.page.scss'],
})
export class CelebracionPage implements OnInit {

  constructor(public router: Router,
              private nativeAudio: NativeAudio
    ) { }

  ngOnInit() {

      this.regresarMenu();
      this.nativeAudio.preloadSimple('victoria', '../../assets/audio/celebraciónVictoria.wav');
  }


  regresarMenu(){
    this.nativeAudio.play('victoria');
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 10000);
  }

}


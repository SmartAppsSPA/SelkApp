import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';


import { FIREBASE_CONFIG } from './app.firebase.config';
import firebase  from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged((user) => {

        if (!user) {
            console.log("not login");
            this.rootPage = LoginPage;


        } else {
            console.log("login");
            this.rootPage = HomePage;

        }

    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

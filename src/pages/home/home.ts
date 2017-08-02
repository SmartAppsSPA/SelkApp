import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  arrCat = [];

  constructor(private afAuth:AngularFireAuth, private toast:ToastController,
              private fdb: AngularFireDatabase,
              public navCtrl: NavController, public navParams: NavParams) {

                this.fdb.list("/categories/").subscribe(_data => {
                  this.arrCat = _data;

                  console.log(this.arrCat);
                });
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid){
        this.toast.create({
          message: `Bienvenido a Sel'k App, ${data.email}`,
          duration: 5000
        }).present();
      }
      else{
        this.toast.create({
          message: `No se pudo obtener información de autenticación.`,
          duration: 5000
        }).present();
      }
    });
  }


}

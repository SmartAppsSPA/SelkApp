import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  arrCat = [];

  constructor(private fdb: AngularFireDatabase, public navCtrl: NavController,
              public navParams: NavParams, public authProv: AuthProvider){

                  this.fdb.list("/categories/").subscribe(_data => {
                    this.arrCat = _data;

                    console.log(this.arrCat);
                  });
                }


  ionViewDidLoad() {
  }


  catClick(){
    this.navCtrl.push(MainPage);
  }


}

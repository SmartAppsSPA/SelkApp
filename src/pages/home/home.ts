import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

import firebase  from 'firebase';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

categories:any;

  constructor(private fdb: AngularFireDatabase, public navCtrl: NavController,
              public navParams: NavParams, public authProv: AuthProvider){

              this.fdb.list("/users/"+this.getUserId()+"/categories").subscribe(_data => {
                  this.categories = _data;

                  //console.log(this.categories);
                });
                }


  ionViewDidLoad() {
    console.log(firebase.auth().currentUser.uid);
  }

  getUserId(){
    return firebase.auth().currentUser.uid;
  }


  catClick(category:any){
    console.log("Categoria: "+category.$key);

  }
  saveCategory(){
    console.log("Funciona funcion saveCategory()");
    var cats = [];

    this.categories.forEach(function (e,i) {
      console.log(e);
      cats[e.$key] = e.$value;
    });

    console.log(cats);


    firebase.database().ref('/users/'+this.getUserId()).set({
      categories: cats
    });
    console.log(this.categories);
  }



}

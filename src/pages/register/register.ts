import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public signupForm;
  loading: any;

  constructor(public navCtrl: NavController, public authProv: AuthProvider,
              public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

                this.signupForm = formBuilder.group({
                  email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                  password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
                });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    }
    else{
      this.authProv.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(LoginPage);
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
        this.loading = this.loadingCtrl.create();
        this.loading.present();

    }
  }

}

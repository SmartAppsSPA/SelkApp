import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';

//Servicio de autenticación de credenciales
import { AuthProvider } from '../../providers/auth/auth';
//Validador de correo electronico, para que el usuario no escriba caracteres extraños
import { EmailValidator } from '../../validators/email';
//Paginas de la aplicación
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public authProv:AuthProvider,
              public fb: Facebook){

                this.loginForm = formBuilder.group({
                  email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                  password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
                });
  }

  loginUser(): void {
      if (!this.loginForm.valid) {
          console.log(this.loginForm.value);
      } else {
          this.authProv.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
              this.loading.dismiss().then(() => {
                  this.navCtrl.setRoot(HomePage);
              });
          }, error => {
              this.loading.dismiss().then(() => {
                  let alert = this.alertCtrl.create({
                      title: 'Algo no anda bien!',
                      subTitle: 'Los datos ingresados no se encuentran en nuestros registros. ¿Tal vez escribio algo mal?',
                      buttons: ["OK"]
                  });
                  alert.present();
              });
          });

          this.loading = this.loadingCtrl.create();
          this.loading.present();
      }
  }
  loginFacebook(): void{
    this.authProv.loginFacebook().then(loginSucces => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });
    }, error => {
      this.loading.dismiss().then( () =>{
        let alert = this.alertCtrl.create({
          title: 'Vaya!',
          subTitle: 'Algo no anda bien... Intente más tarde.',
          buttons: ["OK"]
        });
        alert.present();
      });
    });
  } 

  register(): void {
    this.navCtrl.push(RegisterPage);
  }

}

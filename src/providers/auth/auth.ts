import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {
  }
  /**
   * [loginUser Tomamos el email y la contraseña del usuario para logearnos en la aplicación con firebase]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);

  }
  /**
   * [signupUser]
   * Esta función toma el email y contraseña de un usuario para registrarlo en la aplicación con firebase, una vez hecho esto
   * se registrara un nuevo usuario y se guardara en la base de datos el email y el id del usuario registro, esto para
   * almacenar la informacion del usuario en la BD.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(email: string, password: string): firebase.Promise<any> {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
         // firebase.database().ref('/users').child(email).set({
          //    firstName: "anonymous",
           //   id:newUser.uid,
         // });
        firebase.database().ref('/userProfile').child(newUser.uid).set({
            firstName: "anonymous",
             email: email
      });
    });
  }
  /**
   * [resetPassword]
   * Esta funcion tomara el email ingresado y le enviara un link para restablecer contraseña, Despues firebase manejara
   * la parte de enviar un email y reestablecer el password, no hay que hacer nada acá.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * Esta funcion no toma parametros, solo expulsa al usuario de la aplicacion (logout).
   */
  logoutUser(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }
}

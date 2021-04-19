import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private fb: Facebook,
    private fireAuth: AngularFireAuth,
    public navCtrl: NavController
  ) {}

  loginFacebook() {
    // this.fb
    //   .login(['public_profile', 'user_friends', 'email'])
    //   .then((res: FacebookLoginResponse) =>
    //     this.navCtrl.navigateForward('logged')
    //   )
    //   .catch((e) => console.log('Error logging into Facebook', e));

    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

    this.fb
      .login(['email'])
      .then((response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then((success) => {
            console.log('Info Facebook: ' + JSON.stringify(success));
            this.navCtrl.navigateForward('logged');
          })
          .catch((error) => {
            console.log('Erreur: ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, AlertOptions } from '@ionic/angular';


const SERVER_KEY: string = "BB7JNdT0bNwVdQBRM0BM_0xHQAtN_2QTM7aIU17nLWv2ljDV18_VOzkjyWbW4viUiCRr-Zf_N3X07EdHmUVwYtM";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;


  constructor(readonly swPush: SwPush, private http: HttpClient, private alertController: AlertController ) {
  }

  ngOnInit() {
  }

  showNotification() {
  }

  async subscribeToPush() {
    try {
      this.swPush.requestSubscription({
        serverPublicKey: SERVER_KEY,
      }).then(sub => {
        console.log(sub)
        this.sendSubscription(sub);
      }).catch(err => {
        this.alertController.create({
          message: err,
          buttons: [
            'Cancel'
          ]
        }).then(res => {
          res.present();
        })
      });
      // TODO: Send to server.
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }
  }

  /**
   * 
   * @param params 
   * {
   *  "endpoint":"https://fcm.googleapis.com/fcm/send/fSNUfC4yuqI:APA91bF-Q4IjClnOeMSVQVlJ8gCCUD8tr82Um6KaVD9mi-ETalgCuwLbAu1NHCbGzn3tOLhtSCLMPo9AaDmKYrOyjn3tHO1Ms3OMiIN18oJBljFe-Qez5Hcqkk6P14FJ_03haXuVrGop",
   *  "expirationTime":null,
   *  "keys":
   *   {
   *    "p256dh":"BNL-QO9SF_2G1Fwt9mnhR6VmnAQehEBaPlyJ8i4Xw7o_7iWEs7UZkCS9umNBTkZMy2z5tRIOWS4B268yZfC0TI8",
   *    "auth":"__FWLDAONog0md1nMIu81g"
   *   }
   * }
   */
  sendSubscription = (params: PushSubscription) => {
    const body = JSON.stringify(params);
    console.log("body ", body)
    const url = "/push";
    this.http.post(url, {
      body: body,
      headers: {
        accept: 'application/json',
      }
    }).subscribe(data => {
      this.alertController.create({
        message: "Subscription successfull",
        buttons: [
          'OK'
        ]
      }).then(res => {
        res.present();
      })
    });
  }

  checkGET() {
    const url = "/"
    fetch(url, {
      method: "GET",
      headers: {
        accept: 'application/json',
      }
    }).then(res => console.log(res)).catch(e => console.log(e));
  }

  showAlert() {
    const alertOption: AlertOptions = {
      message: "112",
      buttons: [
        'Dismiss'
      ]
    }
    this.alertController.create(alertOption)
      .then(result => {
        result.present();
      }).catch(error => console.log(error));
  }
}

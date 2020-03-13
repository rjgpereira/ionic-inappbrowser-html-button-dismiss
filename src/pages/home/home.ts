import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inAppBrowserRef;

  options: InAppBrowserOptions = {
    location: 'no',//Or 'no' 
    toolbar: 'no', //iOS only 
    presentationstyle: 'fullscreen',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {

  }

  test() {

    var scriptCode = `
    var div = document.createElement("div");
    div.style = "width: 40px; height:40px; background-image: url('https://image.flaticon.com/icons/png/512/106/106830.png'); background-size: cover;"

    var link = document.createElement("a");
    link.href = "/closeInAppBrowser";
    link.style = "margin:20px;position:absolute;z-index: 9999;";

    link.appendChild(div);
    document.body.appendChild(link);
    `;

    const browser = this.iab.create('https://google.com/maps', '_blank', this.options);


    browser.on('loadstop').subscribe(event => {
      console.log("LOG: loadstop");

      browser.executeScript({
        code: scriptCode
      }).then(
        function (values) {
          console.log("script executed");

        });


    });

    browser.on('loadstart').subscribe(event => {

      if (event.url.match("/closeInAppBrowser")) {
        browser.close();
      }
    });
  }




}





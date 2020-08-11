import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FbLibraryService {

  constructor() { 
    
  }
  groupID = 410650836564717;
  AppId = '726531241502023';
  accesstoken = '';
  fbLibrary() {
    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: this.AppId,
        cookie: true,
        xfbml: true,
        version: 'v7.0'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}

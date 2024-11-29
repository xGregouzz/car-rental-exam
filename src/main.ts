import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { initializeApp } from "firebase/app";
import { importProvidersFrom } from "@angular/core";
import { IonicModule } from "@ionic/angular";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    },
      importProvidersFrom(IonicModule.forRoot({innerHTMLTemplatesEnabled: true})),
      provideIonicAngular(),
      provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

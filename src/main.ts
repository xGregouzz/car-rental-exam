import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { initializeApp } from "firebase/app";
import { importProvidersFrom } from "@angular/core";
import { IonicModule } from "@ionic/angular";

const firebaseConfig = {
  apiKey: "AIzaSyDxlL_denhmmATqpbSttv00gQ9QySotL3o",
  authDomain: "car-rental-exam-63838.firebaseapp.com",
  projectId: "car-rental-exam-63838",
  storageBucket: "car-rental-exam-63838.firebasestorage.app",
  messagingSenderId: "948254018289",
  appId: "1:948254018289:web:06deb517375b2672abb750"
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

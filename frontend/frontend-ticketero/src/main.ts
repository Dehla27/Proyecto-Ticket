import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { appRouting } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    appRouting,
    provideHttpClient() // 👈 aquí sí va correctamente
  ]
}).catch(err => console.error(err));
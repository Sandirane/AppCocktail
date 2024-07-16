import { ApplicationConfig, Injectable, LOCALE_ID, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, } from '@angular/common/http'; 
import { tokenInterceptor } from './helpers/token.interceptor';
import { Translation, TranslocoLoader, provideTransloco } from '@ngneat/transloco';
import { I18nService } from './services/i18n.service';


@Injectable({ providedIn: 'root' })
export class TranslocoModuleLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return import(`./../assets/i18n/${lang}.json`).then(m => m.default);
  }
}

const i18nService = new I18nService(window);

export const appConfig: ApplicationConfig = {
 
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideTransloco({
      config: {
        availableLangs: [...i18nService.availableLangs],
        defaultLang: i18nService.lang,
        prodMode: !isDevMode()
      },
      loader: TranslocoModuleLoader
    }),
    { provide: LOCALE_ID, useValue: i18nService.lang },
    { provide: I18nService, useValue: i18nService }
  ]
  
};

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './interceptors/api.interceptor';

@NgModule({
  providers: [
    provideHttpClient(
      withInterceptors([apiInterceptor])
    )
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
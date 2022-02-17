import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SecretComponent } from './secret/secret.component';
import { AuthInterceptorService } from './auth-interceptor.service';


@NgModule({
  declarations: [RegisterComponent, SecretComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: '/* HTTP_INTERCEPTORS */', //TODO: por Crear una clase que extienda de HttpInterceptor
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  exports: [RegisterComponent]
})
export class SecurityModule { }

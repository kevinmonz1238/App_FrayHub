import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <--- IMPORTANTE: Agregamos esto

import { IonicModule } from '@ionic/angular';

import { AulaPageRoutingModule } from './aula-routing.module';

import { AulaPage } from './aula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule, // <--- IMPORTANTE: Lo registramos aquí
    AulaPageRoutingModule
  ],
  declarations: [AulaPage]
})
export class AulaPageModule {}
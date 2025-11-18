import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { kioskoRoutes } from './kiosko.routes';
import { KioskoComponent } from './kiosko.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(kioskoRoutes)
  ]
})
export class KioskoModule {}

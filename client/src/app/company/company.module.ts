import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './pages/company/company.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CompanyComponent],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class CompanyModule {}

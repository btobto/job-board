import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './pages/company/company.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompanyComponent],
  imports: [CommonModule, FormsModule],
})
export class CompanyModule {}

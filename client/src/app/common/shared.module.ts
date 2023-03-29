import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeOfPipe } from './pipes/user-type-of.pipe';

@NgModule({
  declarations: [UserTypeOfPipe],
  imports: [CommonModule],
  exports: [UserTypeOfPipe],
})
export class SharedModule {}

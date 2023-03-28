import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule],
  providers: [UserService],
})
export class UserModule {}

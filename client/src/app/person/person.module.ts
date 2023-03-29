import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from './person.service';
import { PersonComponent } from './pages/person/person.component';

@NgModule({
  declarations: [PersonComponent],
  imports: [CommonModule],
  providers: [PersonService],
})
export class PersonModule {}

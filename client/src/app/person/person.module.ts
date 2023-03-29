import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from './person.service';
import { PersonComponent } from './pages/person/person.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonComponent],
  imports: [CommonModule, FormsModule],
  providers: [PersonService],
})
export class PersonModule {}

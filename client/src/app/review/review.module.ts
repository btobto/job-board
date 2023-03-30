import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { SharedModule } from '../common/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule],
})
export class ReviewModule {}

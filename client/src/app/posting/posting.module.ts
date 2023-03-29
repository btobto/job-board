import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostingComponent } from './pages/posting/posting.component';
import { PostingsComponent } from './pages/postings/postings.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { UserTypeOfPipe } from '../common/pipes/user-type-of.pipe';
import { SharedModule } from '../common/shared.module';

@NgModule({
  declarations: [PostingComponent, PostingsComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PostingModule {}

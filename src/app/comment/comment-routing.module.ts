import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentComponent } from './comment.component';
import { CommentsGuard } from './guards/comments.guard';

const routes: Routes = [{ path: '', component: CommentComponent,resolve:{comments:CommentsGuard} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }

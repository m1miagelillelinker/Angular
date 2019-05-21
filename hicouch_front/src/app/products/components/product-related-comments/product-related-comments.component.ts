import {Component, Input, OnInit} from '@angular/core';
import {Association} from '../../../shared/models/association';
import {Router} from '@angular/router';
import {Comment} from '../../../shared/models/comment';
import {CommentService} from '../../../shared/services/comment.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-related-comments',
  templateUrl: './product-related-comments.component.html',
  styleUrls: ['./product-related-comments.component.css']
})
export class ProductRelatedCommentsComponent implements OnInit {
  @Input() asso: Association;
  commentContent = new FormControl('', [
      Validators.maxLength(250)
  ]);
  comment: Comment ;
  load: boolean;

  constructor(
      private router: Router,
      private commentService: CommentService,
  ) { }

  ngOnInit() {
  }

  goTo(productId) {
    console.log('go to this product');
    this.router.navigate(['app/products', productId]);
  }

  riseNoteComment(comment: Comment) {
    comment.note = comment.note + 1;
    this.commentService.putComment(comment, comment.idpair);
  }

  goToUserProfile(userId) {
    console.log('go to the user profile who make the comment');
    this.router.navigate(['app/account', userId]);
  }

  addComment() {
      this.comment = {
          id: 1, commentaire: this.commentContent.value, note: 0, iduser: 0, idpair: this.asso.association.idPair, status: 0,
          createdat: new Date(), updatedate: new Date()
      };
      console.log('save comment');
      this.commentService.putComment(this.comment, this.comment.idpair);
      this.load = true;
      setTimeout(() => {
          window.location.reload();
          this.load = false;
      }, 1000);
  }

}

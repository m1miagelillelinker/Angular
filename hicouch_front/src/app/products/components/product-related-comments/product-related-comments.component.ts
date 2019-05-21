import {Component, Input, OnInit} from '@angular/core';
import {Association} from '../../../shared/models/association';
import {Router} from '@angular/router';
import {Comment} from '../../../shared/models/comment';
import {CommentService} from '../../../shared/services/comment.service';

@Component({
  selector: 'app-product-related-comments',
  templateUrl: './product-related-comments.component.html',
  styleUrls: ['./product-related-comments.component.css']
})
export class ProductRelatedCommentsComponent implements OnInit {
  @Input() asso: Association;

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

}

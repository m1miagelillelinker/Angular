import {Component, Inject, Input, OnInit} from '@angular/core';
import {Association} from '../../../shared/models/association';
import {Router} from '@angular/router';
import {Comment} from '../../../shared/models/comment';
import {User} from '../../../shared/models/user';
import {CommentService} from '../../../shared/services/comment.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import {Signalement} from '../../../shared/models/signalement';
import {SignalementService} from '../../../shared/services/signalement.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ProductService} from '../../../shared/services/product.service';

export interface DialogDataComment {
    comment: Comment;
    user: User;
}

@Component({
    selector: 'app-product-related-comments',
    templateUrl: './product-related-comments.component.html',
    styleUrls: ['./product-related-comments.component.scss']
})
export class ProductRelatedCommentsComponent implements OnInit {
    @Input() asso: Association;
    commentContentAdd = new FormControl('', [
        Validators.maxLength(250)
    ]);

    load: boolean;
    userComment: User;
    loggedUser: User = {
        id: 15
    };

    constructor(
        private router: Router,
        private commentService: CommentService,
        private userService: UserService,
        public dialog: MatDialog
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
        const comment = {
            id: null, commentaire: this.commentContentAdd.value, note: 0, iduser: 0, idpair: this.asso.association.idPair, status: 0,
            createdat: new Date(), updatedate: new Date()
        };
        console.log('save comment');
        this.commentService.putComment(comment, comment.idpair);
        this.animationLoad();
    }

    animationLoad() {
        this.load = true;
        setTimeout(() => {
            window.location.reload();
            this.load = false;
        }, 1000);
    }

    getUserSpeudo(userId: number) {
        this.userService.getUser(
            userId.toString()).subscribe(
            value => {this.userComment = value; }
        );
        return this.userComment.pseudo;
    }

    canEdit(comment: Comment) {
        if (comment.iduser == this.loggedUser.id) {
            return true;
        } else {
            return false;
        }
    }

    showPopoverToSignal(comment: Comment) {
        const dialogRef = this.dialog.open(ProductsRelatedCommentSignalDialogComponent, {
            width: '50%',
            data: { comment: comment, user: this.loggedUser }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog for signalement was closed');
            this.animationLoad();
        });

    }

    showPopoverToEdit(comment: Comment) {
        const dialogRef = this.dialog.open(ProductsRelatedCommentUpdateDialogComponent, {
            width: '50%',
            data: { comment: comment, user: this.loggedUser }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog to edit comment was closed');
            this.animationLoad();
        });
    }

}


@Component({
    selector: 'app-product-related-comments-update-dialog',
    templateUrl: 'app-product-related-comments-update-dialog.html',
    styleUrls: ['./product-related-comments.component.scss'],
})
export class ProductsRelatedCommentUpdateDialogComponent implements OnInit {
    commentContentUpdate = new FormControl('', [
        Validators.maxLength(250)
    ]);

    constructor(
        public dialogRef: MatDialogRef<ProductsRelatedCommentUpdateDialogComponent>,
        private commentService: CommentService,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataComment) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.commentContentUpdate.setValue(this.data.comment.commentaire);
    }

    editComment() {
        console.log(this.data.comment);
        this.data.comment.commentaire = this.commentContentUpdate.value;
        console.log('update comment');
        console.log(this.data.comment);
        this.commentService.putComment(this.data.comment, this.data.comment.idpair);
    }
}

@Component({
    selector: 'app-product-related-comments-signal-dialog',
    templateUrl: 'app-product-related-comments-signal-dialog.html',
    styleUrls: ['./product-related-comments.component.scss'],
})
export class ProductsRelatedCommentSignalDialogComponent implements OnInit {
    signalementContentAdd = new FormControl('', [
        Validators.maxLength(250)
    ]);

    constructor(
        public dialogRef: MatDialogRef<ProductsRelatedCommentSignalDialogComponent>,
        private productService: ProductService,
        private signalementService: SignalementService,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataComment) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

    signalComment() {
        const signalement = {
            id: null, typeSignalement: 'comment', SignaledUserId: null, SignaledCommentId: this.data.comment.id,
            message: this.signalementContentAdd.value, idUser: this.data.user.id, status: 0, createdat: new Date(), updatedat: new Date()
        };
        this.signalementService.addSignalement(signalement);
    }
}

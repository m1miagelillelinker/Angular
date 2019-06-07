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
import {VoteService} from '../../../shared/services/vote.service';

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
    @Input() loggedUser: User;
    commentContentAdd = new FormControl('', [
        Validators.maxLength(250)
    ]);

    canVote: boolean;
    checked = false;

    constructor(
        private router: Router,
        private commentService: CommentService,
        private userService: UserService,
        private voteService: VoteService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.canVoteF();
    }

    goTo(productId) {
        console.log('go to this product');
        this.router.navigate(['app/products', productId]);
    }

    canVoteF() {
        (this.asso.userVote == null) ? this.canVote = true : this.canVote = false;
    }

    riseNoteAsso() {
        const vote = {
            idPair: this.asso.association.idPair, idUser: this.loggedUser.id
        };
        this.canVote = false;
        this.voteService.vote(vote);
    }

    decreaseNoteAsso() {
        const vote = {
            idPair: this.asso.association.idPair, idUser: this.loggedUser.id
        };
        this.canVote = true;
        this.voteService.unvote(vote);
    }

    riseNoteComment(comment: Comment) {
        comment.note = comment.note + 1;
        this.commentService.putComment(comment, comment.idpair);
    }

    goToUserProfile(userId) {
        console.log('go to the user profile who made the comment');
        this.router.navigate(['app/account', userId]);
    }

    addComment() {
        const comment = {
            commentaire: this.commentContentAdd.value, iduser: this.loggedUser.id,
            idpair: this.asso.association.idPair, status: this.checked ? 0 : null
        };
        console.log(comment);
        this.commentService.putComment(comment, comment.idpair);
        this.animationLoad();
    }

    animationLoad() {
        const dialogRef = this.dialog.open(SpinnerDialogComponent, {
            width: '15%',
            disableClose: true
        });
    }

    // TODO : display name of user for each comment
    getUserSpeudo(userId: number) {
        let user;
        this.userService.getUser(
            userId.toString()).subscribe(
            value => {user = value; }
        );
        return user.pseudo;
    }

    canEdit(comment: Comment) {
        return comment.iduser == this.loggedUser.id;
    }

    canSignal( comment: Comment) {
        return comment.iduser != this.loggedUser.id;
    }

    showPopoverToSignal(comment: Comment) {
        const dialogRef = this.dialog.open(ProductsRelatedCommentSignalDialogComponent, {
            width: '50%',
            data: { comment: comment, user: this.loggedUser }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog for signalement was closed');
            if (result) {
                this.animationLoad();
            }
        });

    }

    showPopoverToEdit(comment: Comment) {
        const dialogRef = this.dialog.open(ProductsRelatedCommentUpdateDialogComponent, {
            width: '50%',
            data: { comment: comment, user: this.loggedUser }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog to edit comment was closed');
            if (result) {
                this.animationLoad();
            }
        });
    }

    showComment(comment: Comment) {
        if (comment.status === 0 && comment.iduser === this.loggedUser.id) {
            return true;
        }
        if (comment.status === 0 && comment.iduser !== this.loggedUser.id) {
            return false;
        }
        if (comment.status !== 0) {
            return true;
        }
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
    checked = this.data.comment.status == 0 ? true : false;

    constructor(
        public dialogRef: MatDialogRef<ProductsRelatedCommentUpdateDialogComponent>,
        private commentService: CommentService,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataComment) {}

    onNoClick(): void {

        console.log(this.data.comment);
        this.dialogRef.close();
    }

    ngOnInit() {
        this.commentContentUpdate.setValue(this.data.comment.commentaire);
    }

    editComment() {
        this.data.comment.commentaire = this.commentContentUpdate.value;
        this.data.comment.status = (this.checked) ? 0 : null;
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
           typeSignalement: 'comment', SignaledUserId: null, SignaledCommentId: this.data.comment.id,
            message: this.signalementContentAdd.value, idUser: this.data.user.id
        };
        this.signalementService.addSignalement(signalement);
    }
}

@Component({
    selector: 'app-spinner-dialog',
    template: '<mat-spinner></mat-spinner>',
    styleUrls: ['./product-related-comments.component.scss'],
})
export class SpinnerDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<SpinnerDialogComponent>) {}


    ngOnInit() {
        setTimeout(() => {
            this.dialogRef.close();
            window.location.reload();
        }, 700);
    }
}


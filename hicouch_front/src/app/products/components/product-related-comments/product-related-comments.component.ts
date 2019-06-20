import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class ProductRelatedCommentsComponent implements OnInit, OnChanges {
    @Input() asso: Association;
    @Input() loggedUser: User;
    commentaires: Comment[];
    commentContentAdd = new FormControl('', [
        Validators.maxLength(500)
    ]);

    canVoteUpA: boolean;
    canVoteDownA: boolean;
    canVoteUp: boolean;
    canVoteDown: boolean;
    checked = false;

    constructor(
        private router: Router,
        private commentService: CommentService,
        private userService: UserService,
        private voteService: VoteService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.commentService.getCommentByIdPair(this.asso.association.idPair).subscribe((comments: any) => {
            this.commentaires = comments;
        });
        this.canVoteUpA = this.asso.vote ? (this.asso.vote.vote === (0 || -1)) : true;
        this.canVoteDownA = this.asso.vote ? (this.asso.vote.vote === (0 || 1)) : true;

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.commentService.getCommentByIdPair(this.asso.association.idPair).subscribe((comments: any) => {
            this.commentaires = comments;
        });
    }

    goTo(product) {
        this.router.navigate(['app/products', product.type, product.id]);
    }

    noteAsso(note: number) {

        if (!this.asso.vote) {
            this.canVoteUpA = true;
            this.canVoteDownA = true;
            const vote = {
                idPair: this.asso.association.id, vote: note, idUser: this.loggedUser.id
            };
            this.voteService.vote(vote).subscribe();
        } else {
            if (this.asso.vote.vote === note) {
                this.canVoteUpA = this.asso.vote.vote === (0 || -1);
                this.canVoteDownA = this.asso.vote.vote === (0 || 1);
                const vote = {
                    idPair: this.asso.association.id, vote: 0, idUser: this.loggedUser.id
                };
                this.voteService.vote(vote).subscribe();
            } else {
                const vote = {
                    idPair: this.asso.association.id, vote: note, idUser: this.loggedUser.id
                };
                this.voteService.vote(vote).subscribe();
            }
        }
        this.commentService.getCommentByIdPair(this.asso.association.idPair).subscribe((comments: any) => {
            this.commentaires = comments;
        });
    }

    riseNoteComment(comment) {
        const v = comment.vote;
        console.log(v);
        const vote = {
            idComment: this.asso.association.idComment, vote: 1, idUser: this.loggedUser.id
        };
        this.voteService.vote(vote).subscribe(res => console.log(res));
    }

    decreaseNoteComment(comment) {
        let currentVote = null;
        this.voteService.getVoteByUserId(this.loggedUser.id).subscribe(res => currentVote = res.vote);
        const votee = currentVote === 0 ? 1 : 0;
        const vote = {
            idComment: this.asso.association.idComment, vote: votee, idUser: this.loggedUser.id
        };
        this.canVoteDown = votee === 0 || this.canVoteUp;
        this.voteService.vote(vote).subscribe(res => console.log(res));
    }

    goToUserProfile(userId) {
        // HERE
        this.router.navigate(['app/account', userId]);
    }

    addComment() {
        this.commentService.putComment(this.loggedUser.id, this.commentContentAdd.value, this.asso.association.idPair);
        this.commentService.getCommentByIdPair(this.asso.association.idPair).subscribe((comments: any) => {
            this.commentaires = comments;
        });
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
        this.userService.getUser(userId).subscribe(
            value => {user = value; }
        );
        return user.pseudo;
    }

    canEdit(comment: Comment) {
        return comment.owned;
    }

    canSignal( comment: Comment) {
        return !comment.owned;
    }

    showPopoverToSignal(comment: Comment) {
        const dialogRef = this.dialog.open(ProductsRelatedCommentSignalDialogComponent, {
            width: '50%',
            data: { comment: comment, user: this.loggedUser }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog for signalement was closed');
            if (result) {
                // this.animationLoad();
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
                // this.animationLoad();
            }
        });
    }

    showComment(comment: Comment) {
        if (comment.commentaire.status === 0 && comment.owned) {
            return true;
        }
        if (comment.commentaire.status === 0 && !comment.owned) {
            return false;
        }
        if (comment.commentaire.status !== 0) {
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
    checked = this.data.comment.commentaire.status === 0;
    constructor(
        public dialogRef: MatDialogRef<ProductsRelatedCommentUpdateDialogComponent>,
        private commentService: CommentService,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataComment) {}

    onNoClick(): void {

        console.log(this.data.comment);
        this.dialogRef.close();
    }

    ngOnInit() {
        this.commentContentUpdate.setValue(this.data.comment.commentaire.commentaire);
    }

    editComment() {
        this.data.comment.commentaire.commentaire = this.commentContentUpdate.value;
        this.data.comment.commentaire.status = (this.checked) ? 0 : null;
        this.commentService.update(this.data.comment.commentaire.commentaire, this.data.comment.commentaire.id);
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
        this.signalementService.signalCommentaire(this.data.comment.commentaire.id, this.data.user.id, this.signalementContentAdd.value);
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


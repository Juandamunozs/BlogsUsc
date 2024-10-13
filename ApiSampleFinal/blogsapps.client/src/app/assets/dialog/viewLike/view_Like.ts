import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { viewLikeService } from "../../dialog/viewLike/view_like.service";

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view_Like.html',
  styleUrls: ['./view_Like.scss']
})
export class viewLikeDialogComponent implements OnInit {

  postId: string = '';

  saveLike: any[] = [];

  isData: boolean = true;

  constructor(
    private fb: FormBuilder,
    private viewLikeService: viewLikeService,
    public dialogRef: MatDialogRef<viewLikeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {

    this.postId = data.message;

    this.loadViewLike(this.postId);

  }

  ngOnInit() {


  }

  loadViewLike(postId: any): void {
    this.saveLike = [];
    this.viewLikeService.obtenerViewLike(postId).subscribe(
      (data: any) => {
      console.log('Likes del post: ', data);

      if (data.length > 0) {
        this.isData = false;
        this.saveLike = data;
      }else{
        this.isData = true;
      }

    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}

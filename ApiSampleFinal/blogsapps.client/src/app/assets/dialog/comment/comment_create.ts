import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { postService } from "../../dialog/post/post_create.service";
import { HomeService } from "../../../components/home/home.service";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment_create.html',
  styleUrls: ['./comment_create.css']
})
export class CommentDialogComponent implements OnInit {
  form: FormGroup; 
  userId: string = '';
  postId: string = '';
  commentId: string = '';

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    public dialogRef: MatDialogRef<CommentDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public message: any  // Cambié 'data' por 'message'
  ) {
    console.log('Datos del comentario:', message);

    this.form = this.initializeForm();

    // Acceder al contenido desde 'message.message.content'
    if (this.message.message && this.message.message.content) {
      this.postId = this.message.message.postId;
      this.commentId = this.message.message.id;
      this.form.patchValue({
        content: this.message.message.content
      });
    }
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    console.log(this.userId);
    
    if (this.message.message && this.message.message !== 'add') {
      console.log('Modo edición de post');
    } else {
      console.log('Creando post...');
    }
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      content: ['', [Validators.required]], 
    });
  }

  guardarPost() {
    
    if (this.form.valid) {
      const postAction = this.message.message === 'add'
        ? this.homeService.comentarPost(this.userId, this.form.value.content)
        : this.homeService.actualizarComentario(this.userId, this.postId, this.form.value.content, this.commentId);
    
      postAction.subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.dialogRef.close(response); 
          window.location.reload();
        },
        (error: any) => {
          console.error('Error al guardar el post:', error);
          alert('Ocurrió un error al guardar la publicación.'); 
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}

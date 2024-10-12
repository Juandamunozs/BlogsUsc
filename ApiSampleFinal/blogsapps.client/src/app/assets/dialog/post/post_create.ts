import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { postService } from "../../dialog/post/post_create.service";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post_create.html',
  styleUrls: ['./post_create.css']
})
export class PostDialogComponent implements OnInit {
  form: FormGroup; 
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    public dialogRef: MatDialogRef<PostDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    console.log('Datos del dialog:', data);
    this.form = this.initializeForm(); 
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    console.log(this.userId)
    
    if (this.data. message && this.data. message !== 'Crear Post') {
      this.loadPostData(this.data. message);
    } else {
      console.log('Creando post...');
    }
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]], 
      content: ['', [Validators.required]], 
    });
  }

  loadPostData(postId: string) {
    console.log('Cargando post con ID:', postId); 
    this.postService.obtenerPost(postId).subscribe(
      (post: any) => {
        this.form.patchValue({
          title: post.title,
          content: post.content
        });
      },
      (error: any) => {
        console.error('Error al cargar el post:', error);
        alert('Ocurrió un error al cargar los datos del post.');
      }
    );
  }

  guardarPost() {
    if (this.form.valid) {
      const postAction = this.data. message === 'Crear Post'
        ? this.postService.crearPost(this.userId, this.form.value.title, this.form.value.content)
        : this.postService.actualizarPost(this.data. message, this.form.value.title, this.form.value.content);

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

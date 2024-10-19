import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { postService } from "../../dialog/post/post_create.service";
import { HomeService } from "../../../components/home/home.service";
import { ErrorDialogComponent } from "../error/error";

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

  generatedText: string = '';

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    private homeService: HomeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommentDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public message: any  
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

  ErrorDialogComponent(message: any): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message },
      disableClose: true
    });
  }

  validarContenido() {
    try {
      const message = `Por favor, analiza el siguiente texto y devuelve solo un booleano: 'true' si encuentras palabras obscenas o inapropiadas, y 'false' si no encuentras nada de eso. Texto: "${this.form.value.content}"`;
  
      this.postService.generateContent(message).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);


          try {
            this.generatedText = response.candidates[0].content.parts[0].text;
          }catch (error) {

            console.error('Error al obtener el contenido generado:', error);
            this.ErrorDialogComponent('crear comentario');
            return;

          }
  
          console.log('Contenido generado:', this.generatedText);
  
          const matchTrue = /true/i.test(this.generatedText.trim());
          const matchFalse = /false/i.test(this.generatedText.trim());
  
          if (matchTrue) {
            console.log('Se encontraron palabras inapropiadas.');
            this.ErrorDialogComponent('crear comentario');
          } else if (matchFalse) {
            console.log('No se encontraron palabras inapropiadas.');
            this.guardarPost();
          } else {
            console.error('Respuesta inesperada:', this.generatedText);
            this.ErrorDialogComponent('crear comentario');
          }
        },
        (error: any) => {
          console.error('Error al validar el contenido:', error);
          this.ErrorDialogComponent('crear comentario');
          alert('Ocurrió un error al validar el contenido.');
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
      this.ErrorDialogComponent('crear comentario');
      alert('Ocurrió un error inesperado durante la validación del contenido.');
    }
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

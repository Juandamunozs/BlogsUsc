import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { postService } from "../../dialog/post/post_create.service";
import { ErrorDialogComponent } from "../error/error";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post_create.html',
  styleUrls: ['./post_create.css']
})
export class PostDialogComponent implements OnInit {
  form: FormGroup; 
  userId: string = '';

  generatedText: string = '';

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
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

  validarContenido() {
    try {
      const message = `Por favor, analiza el siguiente texto y devuelve solo un booleano: 'true' si encuentras palabras obscenas o inapropiadas, y 'false' si no encuentras nada de eso. Texto: "${this.form.value.title} ${this.form.value.content}"`;
  
      this.postService.generateContent(message).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
  
          try {
            this.generatedText = response.candidates[0].content.parts[0].text;
          }catch (error) {

            console.error('Error al obtener el contenido generado:', error);
            this.ErrorDialogComponent('crear post');
            return;

          }
  
          console.log('Contenido generado:', this.generatedText);
  
          const matchTrue = /true/i.test(this.generatedText.trim());
          const matchFalse = /false/i.test(this.generatedText.trim());
  
          if (matchTrue) {
            console.log('Se encontraron palabras inapropiadas.');
            this.ErrorDialogComponent('crear post')
            this.guardarPostBaneado();
          } else if (matchFalse) {
            console.log('No se encontraron palabras inapropiadas.');
            this.guardarPost();
          } else {
            console.error('Respuesta inesperada:', this.generatedText);
            this.ErrorDialogComponent('crear post')
            this.guardarPostBaneado(); 
          }
        },
        (error: any) => {
          console.error('Error al validar el contenido:', error);
          this.guardarPostBaneado();
          this.ErrorDialogComponent('crear post')
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
      this.guardarPostBaneado();
      this.ErrorDialogComponent('crear post')
    }
  }
  

  ErrorDialogComponent(message: any): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message },
      disableClose: true
    });
  }
  

  guardarPost() {
    if (this.form.valid) {
      const postAction = this.data. message === 'Crear Post'
        ? this.postService.crearPost(this.userId, this.form.value.title, this.form.value.content, 'Espera')
        : this.postService.actualizarPost(this.data. message, this.form.value.title, this.form.value.content, 'Espera');

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
  
  guardarPostBaneado() {
    if (this.form.valid) {
      const postAction = this.data. message === 'Crear Post'
        ? this.postService.crearPost(this.userId, this.form.value.title, this.form.value.content, 'Infringir')
        : this.postService.actualizarPost(this.data. message, this.form.value.title, this.form.value.content, 'Infringir');

      postAction.subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.ErrorDialogComponent('crear post')
          this.cerrar()
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

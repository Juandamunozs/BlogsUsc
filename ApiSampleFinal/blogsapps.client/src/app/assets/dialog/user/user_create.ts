import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../../components/profile/login.service";
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user_create.html',
  styleUrls: ['./user_create.css']
})
export class UserDialogComponent implements OnInit {
  form: FormGroup; 
  userId: string = '';
  usuario: any [] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    public dialogRef: MatDialogRef<UserDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    console.log('Datos del dialog:', data);
    this.form = this.initializeForm(); 
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.loadUserData(this.data.message); 
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]], 
    });
  }

  loadUserData(userId: string) {
    console.log('Cargando usuario con ID:', userId); 
    this.userService.obtenerPerfil(userId).subscribe(
      (user: any) => {
        this.usuario = user;
        this.form.patchValue({
          name: user.name,
          email: user.email
        });
      },
      (error: any) => {
        console.error('Error al cargar el usuario:', error);
        alert('Ocurrió un error al cargar los datos del usuario.');
      }
    );
  }

  guardarUsuario() {
    if (this.form.valid) {
      this.userService.actualizarPerfil(this.data.message, this.form.value, this.usuario).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.dialogRef.close(response); 
          window.location.reload();
        },
        (error: any) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Ocurrió un error al actualizar el usuario.'); 
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

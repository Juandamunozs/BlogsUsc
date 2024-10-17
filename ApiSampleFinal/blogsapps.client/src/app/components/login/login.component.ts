import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private loginService: LoginService
  ) {
    // Inicializa el formulario con validaciones
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Si quisieras manejar cambios en el formulario:
    // this.form.valueChanges.subscribe((values) => {
    //   console.log('El email es:', values.email);
    //   console.log('La contraseña es:', values.contraseña);
    // });
  }

  // Método para encriptar la contraseña con SHA-256
  encryptPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  // Método para iniciar sesión
  Login(): void {
    const emailInput = this.form.value.email;
    const passwordInput = this.form.value.contraseña;

    // Encriptar la contraseña ingresada antes de comparar
    const encryptedPassword = this.encryptPassword(passwordInput);

    this.loginService.Login().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        
        // Iterar sobre los usuarios para validar credenciales
        const user = response.find((usuario: any) => 
          usuario.email === emailInput && usuario.password === encryptedPassword
        );

        if (user) {
          // Almacenar los datos en localStorage si las credenciales coinciden
          localStorage.setItem('rol', user.role);
          localStorage.setItem('user', user.email);
          localStorage.setItem('userId', user.userId);
          localStorage.setItem('name', user.name);

          this.router.navigate(['/Home']); // Redirigir al home
        } else {
          console.log('No existe el usuario o credenciales incorrectas');
        }
      },
      (error) => {
        console.log('Error del servidor:', error);
      }
    );
  }

  // Métodos para login social y otras acciones
  LoginGoogle(): void {
    console.log('Login with Google');
    window.open('http://google.com/');
  }

  LoginFacebook(): void {
    console.log('Login with Facebook');
    window.open('http://facebook.com/');
  }

  recuperar(): void {
    console.log('Intentando recuperar contraseña');
  }

  naviagationCreate(): void {
    console.log('Navegando a la página de registro');
    this.router.navigate(['/LoginCreate']);
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCreateService } from './login-create.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrl: './login-create.component.css'
})
export class LoginCreateComponent {
  form: FormGroup;
  roles: string[] = ['Lector', 'Autor'];
  equalPasswords: string = '';

  constructor(private blog: FormBuilder, private route: Router, private loginCreateService: LoginCreateService) {
    this.form = this.blog.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required, Validators.minLength(6),]],
      role: ['Lector']
    });
  }

  ngOnInit(): void {

    this.form.valueChanges.subscribe((values) => {
      console.log('El email es:', this.form.get('email')?.value);
      console.log('La contraseña es:', this.form.get('contraseña')?.value);
      console.log('La confirmación de la contraseña es:', this.form.get('confirmarContraseña')?.value);

      if (this.form.get('contraseña')?.value !== this.form.get('confirmarContraseña')?.value) {
        this.equalPasswords = 'false';
        console.log('Las contraseñas no coinciden', this.equalPasswords);
      } else {
        this.equalPasswords = 'true';
        console.log('Las contraseñas coinciden', this.equalPasswords);
      }
    });
  }

  LoginGoogle(): void {

    console.log('Login with Google');

    window.open('http://google.com/');
  }

  LoginFacebook(): void {

    console.log('Login with Facebook');

    window.open('http://facebook.com/');

  }

    // Método para encriptar la contraseña con SHA-256
    encryptPassword(password: string): string {
      return CryptoJS.SHA256(password).toString();
    }

  LoginCreate(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const contraseña = this.form.get('contraseña')?.value;
      const confirmarContraseña = this.form.get('confirmarContraseña')?.value;
      const role = this.form.get('role')?.value;
      const name = this.form.get('name')?.value;

      const encryptedPassword = this.encryptPassword(contraseña);

      this.loginCreateService.LoginCreate(email, encryptedPassword, role, name).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          this.route.navigate(['/Login']);
        });

    } else {
      console.log('El formulario no es válido');
    }
  }

  navigateLogin(): void {

    console.log('Navigating to login  page');

    this.route.navigate(['/Login']);

  }

}
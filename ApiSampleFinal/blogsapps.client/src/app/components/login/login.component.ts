import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;

  constructor(private blog: FormBuilder, private route: Router, private loginService: LoginService) {
    this.form = this.blog.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

    // this.form.valueChanges.subscribe((values) => {
    //   console.log('El email es:', values.email);
    //   console.log('La contraseña es:', values.contraseña);
    // });
  }


  LoginGoogle(): void {

    console.log('Login with Google');

    window.open('http://google.com/');
  }

  LoginFacebook(): void {

    console.log('Login with Facebook');

    window.open('http://facebook.com/');

  }

  Login(): void {
    this.loginService.Login().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
 
        Response.forEach((usuario: { email: any; password: any; role: any; name: any, userId: any}) => {

          if (usuario.email === this.form.value.email && usuario.password === this.form.value.contraseña) {

           localStorage.setItem('rol', usuario.role);
           localStorage.setItem('user', usuario.email);
           localStorage.setItem('userId', usuario.userId);

            this.route.navigate(['/Home']);
          }else{
            console.log('No existe el usuario');
          }
          
        });

      }, (error) => {
        console.log('Respuesta del servidor:', error);
      });
  }

  recuperar(): void {
    console.log('Intentando recuperar contraseña');
  }

  naviagationCreate(): void {
    console.log('Navegando a la pagina de registro');
    this.route.navigate(['/LoginCreate']);
  }

}

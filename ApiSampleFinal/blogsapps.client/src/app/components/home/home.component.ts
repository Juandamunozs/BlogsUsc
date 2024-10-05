import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../assets/dialog/post/post_create';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  form: FormGroup | undefined;

  rol: string = '';
  logueado: string = '';
  comentario: boolean = false;
  flagComentario: number = 0;
  comentarPostFlag: boolean = false;
  nuevoComentario: string = '';
  postId_comentario: string = '';
  
  comentarios: any[] = [];
  forMe: any[] = [];
  usuarios: any[] = [];
  posts: any[] = [];
  buscar: any[] = [];

  userId: string = '';
  permised: string = '';
  
  filteredUsers: Observable<any[]> = of([]);
  controlCambios = new FormControl();

  constructor(private route: Router, private homeService: HomeService, private loginService: LoginService, public dialog: MatDialog) {}

  ngOnInit() {
    this.logueado = localStorage.getItem('rol') || '';

    if (this.logueado) {
      this.rol = this.logueado;
      console.log(this.rol);
    }

    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      this.permised = this.userId;
    }

    console.log('Usuario:', this.permised);

    this.user();

    this.filteredUsers = this.controlCambios.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.controlCambios.valueChanges.subscribe(value => {
      console.log(value);
      this.forMe = this._filter(value);

      if (this.forMe.length === 0) {
        this.forMe = this.buscar;
      }

      let usuario = 0;

      this.forMe.forEach((user: any) => {

        if (user.username === value) {
          usuario = user.userId;
          console.log('Usuario encontrado:', usuario);
        }

      });

      if (usuario != 0) {
        this.revisarPerfil(usuario);
      }


    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.forMe.filter(user => 
      user.username.toLowerCase().includes(filterValue) || 
      user.descripcion.toLowerCase().includes(filterValue)
    );
  }

  PostDialogComponent(message: string): void {
    this.dialog.open(PostDialogComponent, {
      data: { message: message },
      disableClose: true 
    });
  }

  crearPost(): void {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      this.PostDialogComponent('Crear Post');
    }
  }


  Login(): void {
    this.route.navigate(['/Login']);
  }

  Logout(): void {
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    this.route.navigate(['/Login']);
  }

  revisarPerfil(username: any): void {
    if (username === 'me') {
      const username = localStorage.getItem('userId');
      console.log('Navegando a mi perfil');
      this.route.navigate(['/Profile', username]);
    } else {
      console.log('Navegando al perfil de:', username);
      this.route.navigate(['/Profile', username]);
    }
  }

  like(postId: any): void {

    const userId = localStorage.getItem('userId');
    
    console.log('El usuario con id', userId , 'le dio like al Post con id ', postId)

    if(userId != null){

      this.homeService.like(userId, postId).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }
  }

  comment(postId: string): void {
    this.comentarPostFlag = true;

    console.log('Vamos a comentar');
    this.flagComentario += 1;
    console.log(this.flagComentario);

    this.comentario = this.flagComentario % 2 !== 0;
    console.log(this.comentario ? 'Abrir' : 'Cerrar');

    if (this.comentario) {
        this.postId_comentario = postId;

        this.comentarios = [];
        localStorage.setItem('postId', postId);

        this.homeService.comentarios().subscribe(
            (Response: any) => {
                Response.forEach((comentario: any) => {
                    this.usuarios.forEach((user: any) => {
                        if (comentario.postId == postId && comentario.userId == user.userId) {
                            this.comentarios.push({
                                ...comentario,
                                userName: user.name 
                            }); 
                        }
                    });
                });

                console.log('Comentarios:', this.comentarios);
            },
            (error) => {
                console.error('Error al obtener los posts:', error);
            }
        );

    } else {
        localStorage.removeItem('postId');
    }
}

  

  comentarPost(): void {

    const userId = localStorage.getItem('userId');
    const postId = localStorage.getItem('postId');

    if (userId != null && postId != null) {
      this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }

  }

  guardarComentario(): void {
    const userId = localStorage.getItem('userId');
    const postId = localStorage.getItem('postId');

    if (userId != null && postId != null) {
      this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          this.comment(postId);
          this.nuevoComentario = '';
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }
  }

  edit(postId: string): void {
    this.PostDialogComponent(postId);
  }

  delete(postId: string): void {

    const userId = localStorage.getItem('userId');
    
    console.log('El usuario con id', userId , 'elimino el Post con id ', postId)

    if(userId != null){

      this.homeService.deletePost(userId, postId).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }
    
  }

  post(usuarios: any[]): void {
    this.homeService.post().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.posts = Response;  
        this.renderizar(this.posts, usuarios);
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }
  
  user(): void {
    this.loginService.Login().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.usuarios = Response;
        this.post(this.usuarios); 
      },
      (error) => {
        console.log('Error del servidor:', error);
      }
    );
  }
  
  renderizar(posts: any[], usuarios: any[]): void {
    this.forMe = [];

    console.log('Posts:', posts);

    posts.forEach((post: any) => {
      usuarios.forEach((user: any) => {
        if (post.userId === user.userId) {

          this.forMe.push({
            userId: user.userId,
            postId: post.postId,
            username: user.name,
            user: user.email,
            descripcion: post.content,
            title: post.title,
            pubDate: post.pubDate
          });
        }
      });
    });

    const uniqueDescriptions = new Set(); 
    this.forMe = this.forMe.filter((item) => {
      if (!uniqueDescriptions.has(item.descripcion)) {
        uniqueDescriptions.add(item.descripcion); 
        return true; 
      }
      return false; 
    });

    this.forMe = this.forMe.reverse();

    this.buscar = this.forMe;

    console.log('Usuarios que me interesan:', this.forMe);
  }
}

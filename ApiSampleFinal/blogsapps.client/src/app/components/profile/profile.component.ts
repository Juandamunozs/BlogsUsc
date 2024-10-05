import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../assets/dialog/user/user_create';
import { PostDialogComponent } from '../../assets/dialog/post/post_create';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  usuarioPerfil: any = {};
  postUsuario: any[] = [];
  postUsuarioRenderizar: any[] = [];
  comentarios: any[] = [];
  usuarios: any[] = [];
  rol: string = '';
  user: string = '';
  user_perfil: string = '';
  user_post: string = '';
  comentario: boolean = false;
  flagComentario: number = 0;
  comentarPostFlag: boolean = false;
  nuevoComentario: string = '';
  postId_comentario: string = '';

  userId: string = '';
  permised: string = '';
  permisedUser: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || '';
    this.user = localStorage.getItem('user') || '';
    this.user_perfil = localStorage.getItem('user') || '';
    this.route.paramMap.subscribe(params => {
    const username = params.get('username');
    this.user_post = username || '';

    const userId = localStorage.getItem('userId') || '';

      this.users();

      if (username) {
        this.permised = username;
        console.log('Usuario logueado permiso:', this.permised);
      }

      if (username) {
        this.cargarperfil(username);
      }

      if (userId === username) {
        this.user = username;
        this.permisedUser = true;
        console.log('Es mi perfil');
      } else {
        console.log('No es mi perfil');
        this.permisedUser = false;
        this.user = '';
      }

    });
  }

  activarEdicion(): void {
    this.editMode = true;
  }

  cancelarEdicion(): void {
    this.editMode = false;
    if (this.usuarioPerfil.username) {
      this.cargarperfil(this.usuarioPerfil.username);
    }
  }

  guardarCambios(): void {
    // this.usuarioService.actualizarPerfil(this.usuarioPerfil).subscribe(
    //   (response) => {
    //     this.editMode = false;
    //     console.log('Perfil actualizado:', response);
    //   },
    //   (error) => {
    //     console.error('Error al actualizar el perfil:', error);
    //   }
    // );
  }

  UserDialogComponent(message: string): void {
    this.dialog.open(UserDialogComponent, {
      data: { message: message },
      disableClose: true 
    });
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  follow(): void {
    console.log(this.user_perfil, ' empezo a seguir a ', this.user_post);
  }

  unfollow(): void {
    console.log(this.user_perfil, ' dejo de seguir a ', this.user_post);
  }

  block(): void {
    console.log(this.user_perfil, ' bloqueo al usuario ', this.user_post);
  }

  unlock(): void {
    console.log(this.user_perfil, ' desbloqueo al usuario ', this.user_post);
  }

  comment(postId: string): void {
    this.comentarPostFlag = true;

    console.log('Vamos a comentar');
    this.flagComentario += 1;
    console.log(this.flagComentario);

    this.comentario = this.flagComentario % 2 !== 0;
    console.log(this.comentario ? 'Abrir' : 'Cerrar');

    if (this.comentario) {
      this.postId_comentario = postId

      this.comentarios = [];

      localStorage.setItem('postId', postId);

      this.homeService.comentarios().subscribe(
        (Response: any) => {
          //console.log('Respuesta del servidor:', Response);
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

    this.comentarPostFlag = true;

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

  share(): void {

    console.log('Vamos a compartir');

  }

  delete(postId: string): void {

    const userId = localStorage.getItem('userId');

    console.log('El usuario con id', userId, 'elimino el Post con id ', postId)

    if (userId != null) {

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

  users(): void {
    this.loginService.Login().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.usuarios = Response;
      },
      (error) => {
        console.log('Error del servidor:', error);
      }
    );
  }

  like(postId: any): void {

    const userId = localStorage.getItem('userId');

    console.log('El usuario con id', userId, 'le dio like al Post con id ', postId)

    if (userId != null) {

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


  cargarperfil(username: string): void {

    this.usuarioService.obtenerPerfil(username).subscribe(
      (response) => {
        this.usuarioPerfil = response;
        console.log('Perfil cargado:', response);
        this.post(response.name, response.email);
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);

      });
  }

  post(name: string, username: string): void {
    this.usuarioService.post().subscribe(
      (response) => {
        const postsConUsuario = response.map((post: any) => ({
          ...post,
          username: username,
          user: name
        }));

        // Agrega los nuevos posts al array existente
        this.postUsuario = [...this.postUsuario, ...postsConUsuario];

        this.postUsuario.forEach((post: any) => {

          if (post.userId == this.permised) {

            this.postUsuarioRenderizar.push(post);

          }

        });

        console.log('Posts cargados:', this.postUsuarioRenderizar);

      },
      (error) => {
        console.error('Error al cargar los posts:', error);
      }
    );
  }

  edit(): void {

    const userId = localStorage.getItem('userId');
    if (userId != null){
    
      this.UserDialogComponent(userId);
    }

  }
  
  editPost(postId: string): void {
    this.PostDialogComponent(postId);
  }
}
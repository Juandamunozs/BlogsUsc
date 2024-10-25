import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../assets/dialog/user/user_create';
import { PostDialogComponent } from '../../assets/dialog/post/post_create';
import { CommentDialogComponent, ErrorDialogComponent, viewLikeDialogComponent } from '../../assets/export_dialog';

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
  likePost: any[] = [];
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

  username: any = '';

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

      const userExiste = params.get('username');
      
      if(userExiste){
        this.username = params.get('username');
      }

      this.user_post = this.username || '';

      this.userId = localStorage.getItem('userId') || '';

      this.users();

      if (this.username) {
        this.permised = this.username;
        console.log('Usuario logueado permiso:', this.permised);
      }

      if (this.username) {
        this.cargarperfil(this.username);
      }

      if (this.userId === this.username) {
        this.user = this.username;
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

    console.log(this.comentario)

    if (this.comentario) {
      this.postId_comentario = postId

      this.comentarios = [];

      localStorage.setItem('postId', postId);

      this.homeService.comentarios().subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          Response.forEach((comentario: any) => {
            this.usuarios.forEach((user: any) => {
              console.log(comentario.postId, '==', postId, '&&', comentario.userId, '==', user.userId);
              if (comentario.postId == postId && comentario.userId == user.userId) {
                this.comentarios.push({
                  ...comentario,
                  userName: user.name
                });
              }
            });
          });

          this.comentarios.reverse();

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

  // guardarComentario(): void {
  //   const userId = localStorage.getItem('userId');
  //   const postId = localStorage.getItem('postId');

  //   // if (userId != null && postId != null) {
  //   //   this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
  //   //     (Response: any) => {
  //   //       console.log('Respuesta del servidor:', Response);
  //   //       this.comment(postId);
  //   //       this.nuevoComentario = '';
  //   //     },
  //   //     (error) => {
  //   //       console.error('Error al obtener los posts:', error);
  //   //     }
  //   //   );
  //   // }
  // }

  guardarComentario(): void {
    const userId = localStorage.getItem('userId');
    const postId = localStorage.getItem('postId');

    this.CommentDialogComponent('add');

    // if (userId != null && postId != null) {
    //   this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
    //     (Response: any) => {
    //       console.log('Respuesta del servidor:', Response);
    //       this.comment(postId);
    //       this.nuevoComentario = '';
    //     },
    //     (error) => {
    //       console.error('Error al obtener los posts:', error);
    //     }
    //   );
    // }
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

  view_likeDialogComponent(message: string): void {
    this.dialog.open(viewLikeDialogComponent, {
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
    this.usuarios = [];
    this.loginService.Login().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.usuarios = Response;
        this.likepost();
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
          this.users();
          this.cargarperfil(this.username);
          this.cargarperfil(this.username);
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
          this.users();
          this.cargarperfil(this.username);
          this.cargarperfil(this.username);
        }
      );
    }
  }

  dislike(likeId: any): void {
    console.log('vamos a dar dislike al like con id:', likeId);
    this.homeService.dislike(likeId).subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.users();
        this.users();
        this.cargarperfil(this.username);
        this.cargarperfil(this.username);
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
        this.users();
        this.users();
        this.cargarperfil(this.username);
        this.cargarperfil(this.username);
      }
    );
  }

  viewLikes(postId: any): void {

    this.view_likeDialogComponent(postId);

  }


  cargarperfil(username: string): void {
   this.usuarioPerfil = {};
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
    this.postUsuario = [];
    this.usuarioService.post().subscribe(
      (response) => {
        const postsConUsuario = response.map((post: any) => ({
          ...post,
          username: username,
          user: name
        }));
  
        // Agrega los nuevos posts al array existente, evitando duplicados
        this.postUsuario = [
          ...this.postUsuario,
          ...postsConUsuario.filter(
            ( newPost: { id: any; }) => !this.postUsuario.some(existingPost => existingPost.id === newPost.id)
          )
        ];
  
        this.postUsuarioRenderizar = [];
  
        // Filtra posts por userId
        this.postUsuario.forEach((post: any) => {
          if (post.userId === this.permised) {
            this.postUsuarioRenderizar.push(post);
          }
        });
  
        // Reemplaza 'T' por un espacio en 'pubDate' y invierte el array
        this.postUsuarioRenderizar = this.postUsuarioRenderizar
          .map(post => ({
            ...post,
            pubDate: post.pubDate.replace('T', ' ')
          }))
          .reverse();
  
        // Agrega información de likes
        this.postUsuarioRenderizar = this.postUsuarioRenderizar.map((post: any) => {
          const like = this.likePost.find(like => like.postId === post.id);
          const isLiked = !!like;
  
          return {
            ...post,
            liked: isLiked,
            likeId: isLiked ? like.id : null
          };
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
    if (userId != null) {

      this.UserDialogComponent(userId);
    }

  }

  likepost(): void {
    this.likePost = [];
    this.homeService.likepost().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor de likes:', Response);

        Response.forEach((like: any) => {

          if (like.userId == this.userId) {
            this.likePost.push(like);
          }
        });

        console.log('Likes:', this.likePost);

      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }

  editPost(postId: string): void {
    this.PostDialogComponent(postId);
  }

  deleteComentario(commentId: string): void {
    console.log('Vamos a eliminar el comentario con id:', commentId);
    this.homeService.deleteComment(commentId).subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.comment(this.postId_comentario);
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }

  commentEdit(content: string, id: string, postId: string, pubDate: string, userId: string): void {
    // Crear el objeto con los datos que vienen como parámetros
    const commentData = {
        content: content,
        id: id,
        postId: postId,
        pubDate: pubDate,
        userId: userId
    };

   console.log('Vamos a editar el comentario:', commentData);

    // Pasar el objeto al componente del diálogo
    this.CommentDialogComponent(commentData);
}

CommentDialogComponent(message: any): void {
  this.dialog.open(CommentDialogComponent, {
    data: { message: message },
    disableClose: true
  });
}

AceptarPost(id: string, title: string, content: string, userId: string, rating: string, blogId: string): void {
  this.homeService.actualizarStatus(id, title, content, userId, rating, 'Aceptado', blogId).subscribe(
    (Response: any) => {
      console.log('Respuesta del servidor (Aceptar):', Response);
      this.users();
      this.users();
      this.cargarperfil(this.username);
      this.cargarperfil(this.username);
    },
    (error) => {
      console.error('Error al aceptar el post:', error);
    }
  );
}

DesbanearPost(id: string, title: string, content: string, userId: string, rating: string, blogId: string): void {
  this.homeService.actualizarStatus(id, title, content, userId, rating, 'Aceptado', blogId).subscribe(
    (Response: any) => {
      console.log('Respuesta del servidor (Desbanear):', Response);
      this.users();
      this.users();
      this.cargarperfil(this.username);
      this.cargarperfil(this.username);
    },
    (error) => {
      console.error('Error al desbanear el post:', error);
    }
  );
}

eliminarUser():void {
  console.log('Vamos a eliminar el usuario con id:', this.username);
  this.usuarioService.deleteUser(this.username).subscribe(
    (Response: any) => {
      console.log('Respuesta del servidor:', Response);
      this.router.navigate(['/Home']);
    },
    (error) => {
      console.error('Error al eliminar el usuario:', error);
      // this.ErrorDialogComponent('eliminar usuario');
      
    }
  );
}

ErrorDialogComponent(message: any): void {
  this.dialog.open(ErrorDialogComponent, {
    data: { message: message },
    disableClose: true
  });
}

BanearPost(id: string, title: string, content: string, userId: string, rating: string, blogId: string): void {
  this.homeService.actualizarStatus(id, title, content, userId, rating, 'Rechazado', blogId).subscribe(
    (Response: any) => {
      console.log('Respuesta del servidor (Banear):', Response);
      this.users();
      this.users();
      this.cargarperfil(this.username);
      this.cargarperfil(this.username);
    },
    (error) => {
      console.error('Error al banear el post:', error);
    }
  );
}
}
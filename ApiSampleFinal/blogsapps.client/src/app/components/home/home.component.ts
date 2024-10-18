import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../assets/dialog/post/post_create';
import { CommentDialogComponent, viewLikeDialogComponent } from '../../assets/export_dialog';

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

 infringe: number = 0;

  comentarios: any[] = [];
  forMe: any[] = [];
  usuarios: any[] = [];
  posts: any[] = [];
  buscar: any[] = [];
  likePost: any[] = [];

  userId: string = '';
  permised: string = '';

  filteredUsers: Observable<any[]> = of([]);
  controlCambios = new FormControl();

  constructor(private route: Router, private homeService: HomeService, private loginService: LoginService, public dialog: MatDialog) { }

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

  CommentDialogComponent(message: any): void {
    this.dialog.open(CommentDialogComponent, {
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

    console.log('El usuario con id', userId, 'le dio like al Post con id ', postId)

    if (userId != null) {

      this.homeService.like(userId, postId).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          this.user();
          this.user();
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
          this.user();
          this.user();
        }
      );
    }
  }

  dislike(likeId: any): void {
    console.log('vamos a dar dislike al like con id:', likeId);
    this.homeService.dislike(likeId).subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.user();
        this.user();
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
        this.user();
        this.user();
      }
    );
  }

  viewLikes(postId: any): void {

    this.view_likeDialogComponent(postId);

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

      // console.log('Vamos a comentar el post:', postId);

      this.comentarios = [];
      localStorage.setItem('postId', postId);

      this.homeService.comentarios().subscribe(
        (Response: any) => {
          // console.log('Respuesta del servidor:', Response);
          Response.forEach((comentario: any) => {
            this.usuarios.forEach((user: any) => {
              // console.log(comentario.postId, '==', postId, '&&', comentario.userId, '==', user.userId);
              if (comentario.postId == postId && comentario.userId == user.userId) {
                this.comentarios.push({
                  ...comentario,
                  userName: user.name
                });
              }
            });
          });

          this.comentarios = this.comentarios.reverse();

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

    // if (userId != null && postId != null) {
    //   this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
    //     (Response: any) => {
    //       console.log('Respuesta del servidor:', Response);
    //     },
    //     (error) => {
    //       console.error('Error al obtener los posts:', error);
    //     }
    //   );
    // }

  }

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

  edit(postId: string): void {
    this.PostDialogComponent(postId);
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


  delete(postId: string): void {

    const userId = localStorage.getItem('userId');

    console.log('El usuario con id', userId, 'elimino el Post con id ', postId)

    if (userId != null) {

      this.homeService.deletePost(userId, postId).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          this.user();
        },
        (error: any) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }

  }

  post(usuarios: any[]): void {
    this.posts = [];
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
    this.usuarios = [];
    this.loginService.Login().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor usuarios:', Response);
        this.usuarios = Response;
        this.likepost();
        this.post(this.usuarios);
      },
      (error) => {
        console.log('Error del servidor:', error);
        this.route.navigate(['/Mantenimiento']);
      }
    );
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

  renderizar(posts: any[], usuarios: any[]): void {
    this.forMe = [];
    
    console.log('Posts:', posts);
    console.log('Users', usuarios);
    console.log('Likes:', this.likePost);

    // Filtrar duplicados en likePost (si es necesario, revisa esto)
    // this.likePost = this.likePost.filter((like, index, self) => 
    //   index === self.findIndex((t) => (
    //       t.userId === like.userId && t.postId === like.postId
    //   ))
    // );
  
    console.log('Likes:', this.likePost);
  
    posts.forEach((post: any) => {
      usuarios.forEach((user: any) => {
        console.log(post.userId, '==', this.userId);
        if (post.userId === user.userId) {
          // Verificar si hay un like para este post
          const like = this.likePost.find(like => 
            like.postId === post.id 
          );

          if(post.status == 'Infringir'){
            this.infringe += 1;
          }
    
          // Si existe un like, obtener su ID; si no, establecer como null
          const likeId = like ? like.id : null;
    
          this.forMe.push({
            userId: user.userId,
            postId: post.id,
            username: user.name,
            user: user.email,
            descripcion: post.content,
            title: post.title,
            pubDate: post.pubDate.replace('T', ' '),
            liked: !!like,  
            likeId: likeId,
            status: post.status,
            blogId: post.blogId,
            rating: post.rating
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

AceptarPost(id: string, title: string, content: string, userId: string, rating: string, blogId: string): void {
  this.homeService.actualizarStatus(id, title, content, userId, rating, 'Aceptado', blogId).subscribe(
    (Response: any) => {
      console.log('Respuesta del servidor (Aceptar):', Response);
      this.user(); 
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
      this.user(); 
    },
    (error) => {
      console.error('Error al desbanear el post:', error);
    }
  );
}

BanearPost(id: string, title: string, content: string, userId: string, rating: string, blogId: string): void {
  this.homeService.actualizarStatus(id, title, content, userId, rating, 'Rechazado', blogId).subscribe(
    (Response: any) => {
      console.log('Respuesta del servidor (Banear):', Response);
      this.user(); 
    },
    (error) => {
      console.error('Error al banear el post:', error);
    }
  );
}
 
}

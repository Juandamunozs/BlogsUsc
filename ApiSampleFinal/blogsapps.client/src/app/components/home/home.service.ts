import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class HomeService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para traer los post
    public post() {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}Posts`);
    }

    // Método para traer los post
    public likepost() {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}LikePosts`);
    }

    // Método para traer los post
    public comentarios() {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}Comments`);
    }

    // Comentario para crear un comentario
    public comentarPost(userId: string, comentario: string) {

        const pubDate = this.getDate();

        const postId = localStorage.getItem('postId');

        const objLogin = { UserId: userId, PostId: postId, Content: comentario, PubDate: pubDate };

        console.log('Objeto de usuario a comentar: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Comments`, objLogin);

    }

    public actualizarComentario(userId: string, postId: string, comentario: string, commentId: string) {

        const pubDate = this.getDate();
    
        const objLogin = { 
            Id : commentId,
            UserId: userId, 
            PostId: postId, 
            Content: comentario, 
            PubDate: pubDate 
        };
    
        console.log('Objeto de usuario a comentar (actualización): ', objLogin);
    
        // Enviar la solicitud PUT
        return this.http.put<any>(`${this.API}Comments/${commentId}`, objLogin);
    }

    public actualizarStatus(id: string, title: string, content: string, userId: string, rating: string, status: string, blogId: string) {

        const pubDate = this.getDate();

        // Crear el objeto con los campos que recibes por argumento
        const objPost = { 
            id: id,            
            title: title,      
            content: content,  
            pubDate: pubDate,  
            userId: userId,    
            rating: rating,   
            status: status,    
            blogId: blogId     
        };
    
        console.log('Objeto enviado en la actualización: ', objPost);
    
        // Enviar la solicitud POST
        return this.http.put<any>(`${this.API}Posts/${id}/status`, objPost);
    }
    
    
    


    // Método para dar like
    public like(userId: string, postId: string) {

        const userName = localStorage.getItem('name');
         
        const userEmail = localStorage.getItem('user');

        const objLogin = { userId: userId, postId: postId, userName: userName, userEmail: userEmail };

        console.log('Objeto de usuario a likear: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}LikePosts`, objLogin);

    }

    public deletePost(userId: string, postId: string) {

        const objLogin = { userId: userId, postId: postId };

        console.log('Objeto de post a eliminar: ', `${this.API}Posts/${postId}`);

        // Enviar la solicitud POST
        return this.http.delete<any>(`${this.API}Posts/${postId}`);

    }

    public deleteComment(commentId: string) {
            
            console.log('Objeto de post a eliminar: ', `${this.API}Comments/${commentId}`);
    
            // Enviar la solicitud POST
            return this.http.delete<any>(`${this.API}Comments/${commentId}`);
    
        }

    public dislike(LikeId: string) {

        // const objLogin = { userId: userId, postId: postId };

        console.log('Objeto de post a eliminar: ', `${this.API}Posts/${LikeId}`);

        // console.log('Objeto de post a eliminar: ', `${this.API}Posts/${postId}`);

        // Enviar la solicitud POST
        // return this.http.delete<any>(`${this.API}Posts/${postId}`);
        return this.http.delete<any>(`${this.API}LikePosts/${LikeId}`);

    }

    public getDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
        const day = String(currentDate.getDate()).padStart(2, '0'); // Días del mes

        return `${year}-${month}-${day}`;
    }

}
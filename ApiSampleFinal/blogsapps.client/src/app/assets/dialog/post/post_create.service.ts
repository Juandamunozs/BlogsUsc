import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class postService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para agregar un nuevo punto de venta
    public crearPost(userId: string, title: string, content: string){
        const pubDate = this.getDate();

        const objLogin = { UserId: userId, Title: title, Content: content, PubDate: pubDate, status: 'Espera', rating: '5', blogId: "28CB2010-3F50-44CD-D3D9-08DCE58FD310"};

        console.log('Objeto de usuario a comentar: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Posts`, objLogin);
        
    }

    public getDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
    

    public obtenerPost(postId: string){
        return this.http.get(`${this.API}Posts/${postId}`);
    }

    public actualizarPost(postId: string, title: string, content: string) {

        // Obtener el UserId desde localStorage
        const userId = localStorage.getItem('userId') || '';
    
        // Obtener la fecha actual
        const pubDate = this.getDate();
    
        // Construir el objeto con los datos para actualizar el post
        const objLogin = {
            userId: userId,
            title: title,
            content: content,
            pubDate: pubDate,
            status: 'Espera',
            id: postId,
            rating: '5',  
            blogId: "28CB2010-3F50-44CD-D3D9-08DCE58FD310"  
        };
    
        console.log('Objeto de usuario a comentar: ', objLogin);
    
        // Realizar la solicitud HTTP PUT para actualizar el post
        return this.http.put(`${this.API}Posts/${postId}`, objLogin);
    }

}
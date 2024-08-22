import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Todo } from '../../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = environment.apiBaseUrl;
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  constructor(private http: HttpClient) { }

  getTodos(email: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/tasks?userId=${email}`);
  }

 
  createTodo(todo: Todo){
    return this.http.post(`${this.apiUrl}/tasks`, todo, {headers: this.httpHeaders});
  }

  updateTodo(todo: Todo){
    return this.http.put(`${this.apiUrl}/tasks/${todo.id}`, todo);
  }

  deleteTodoById(id: string){
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

}

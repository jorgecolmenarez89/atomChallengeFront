import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../models/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos for a given email', () => {
    const email = 'test@example.com';
    const mockTodos: Todo[] = [
      { id: '1', title: 'Test Todo 1', description: 'test1', done: false },
      { id: '2', title: 'Test Todo 2', description: 'test2', done: true }
    ];

    service.getTodos(email).subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/tasks?userId=${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should create a new todo', () => {
    const newTodo: Todo = { id: '3', title: 'New Todo', description: 'description',  done: false };

    service.createTodo(newTodo).subscribe(todo => {
      expect(todo).toEqual(newTodo);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(newTodo);
  });

  it('should update an existing todo', () => {
    const updatedTodo: Todo = { id: '1', title: 'Updated Todo', description: 'description',  done: true };

    service.updateTodo(updatedTodo).subscribe(todo => {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/tasks/${updatedTodo.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTodo);
    req.flush(updatedTodo);
  });

  it('should delete a todo by id', () => {
    const todoId = '1';

    service.deleteTodoById(todoId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/tasks/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
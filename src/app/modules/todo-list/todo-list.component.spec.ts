import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { HttpClient } from '@angular/common/http';
import { TodoService } from '../../services/todo/todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoListComponent', () => {
  let service: TodoService;
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, HttpClientTestingModule],
      providers: [HttpClient, TodoService]
    })
    .compileComponents();
    
    service = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

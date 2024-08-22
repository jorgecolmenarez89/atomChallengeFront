import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../models/todo';
import { MaterialModule } from '../shared/material.module';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../components/dialog-message/dialog-message.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})

export class TodoListComponent implements OnInit {

  email = localStorage.getItem('email') ?? '';
  todos: Todo[] = [];
  isEditing = false;
  loading = true;
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'done', 'actions'];

  constructor(private todoService: TodoService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTodos();
  }

  getUser() {
    return localStorage.getItem('email') ?? '';
  }

  getTodos() {
    this.todoService.getTodos(this.email).subscribe(
      (response) => {
        this.todos = response;
        this.loading = false;
      },
      (error) => {
        console.log('error', error);
        this.loading = false;
      }
    );
  }

  addTodo() {
    this.isEditing = false;
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '700px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {todo: null, isEditing: this.isEditing}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTodos();
    });
  }

  editTodo(todo: Todo) {
    this.isEditing = true;
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '700px',
      data: {todo: todo, isEditing: this.isEditing}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTodos();
    });
  }

  deleteTodo(todo: Todo) {
    this.isEditing = false;
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '350px',
      data: {
        title: '¿ Deseas eliminar esta tarea ?',
        principalButtonText: 'Aceptar',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.confirmDelete(todo);
      }
    });
  }

  confirmDelete(todo: Todo) {
    this.todoService.deleteTodoById(todo.id ?? '').subscribe(
      (response) => {
        this.getTodos();
      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  toggleDone(todo: Todo) {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo).subscribe(
      (response) => {
        this.getTodos();
      },
      (error) => {
        console.log('error', error);
      }
    );

  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/shared/material.module';
import { CommonsModule } from '../../modules/shared/commons.module';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo/todo.service';
import moment from 'moment';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MaterialModule, CommonsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  userForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    done: new FormControl(false),
    userId: new FormControl(localStorage.getItem('email') ?? '', Validators.required),
    createdAt: new FormControl(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  });
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    console.log('data', this.data);
    if (this.data.todo) {
      this.userForm.patchValue(this.data.todo);
    }
  }

  onSubmit() {
    const body: Todo = {
      id: this.data.todo?.id ?? '',
      title: this.userForm.value.title ?? '',
      description: this.userForm.value.description ?? '',
      done: this.userForm.value.done ?? false,
      userId: localStorage.getItem('email') ?? '',
      createdAt: this.userForm.value.createdAt ?? moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
    this.loading = true;
    if (this.data.isEditing) {
      this.todoService.updateTodo(body).subscribe(
        (response) => {
          console.log('response', response);
          this.dialogRef.close();
          this.loading = false;
        },
        (error) => {
          console.log('error', error);
          this.loading = false;
        }
      )
    } else {
      this.todoService.createTodo(body).subscribe(
        (response) => {
          console.log('response', response);
          this.dialogRef.close();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.log('error', error);
        }
      )
    }
  }

}

import { Component, inject } from '@angular/core';
import { MaterialModule } from '../shared/material.module'; 
import { CommonsModule } from '../shared/commons.module';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormField} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';

import { AuthService } from '../../services/auth/auth.service';
import { DialogMessageComponent } from '../../components/dialog-message/dialog-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MaterialModule,
    MatFormField,
    CommonsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  loading = false;

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) { }

  onSubmit(){
    if (this.emailFormControl.value !== null && this.emailFormControl.value !== undefined) {
      this.loading = true;
      this.authService.login(this.emailFormControl.value).subscribe(
        (response) => {
          localStorage.setItem('email', this.emailFormControl.value ?? '');
          this.loading = false;
          this.router.navigate(['/todo']);
        },
        (error) => {
          console.log('error', error);
          if (error.status === 404) {
            this.loading = false;
            this.openDialogRegister();
          }
        }
      );
    }
  }

  openDialogRegister() {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '350px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: '¿ El Usuario ingresado no existe deseas registrarlo ?',
        principalButtonText: 'Registrar',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'accept') {
        this.onRegister();
      }
    });

  }

  onRegister() {
    if (this.emailFormControl.value !== null) {
      this.authService.register(this.emailFormControl.value).subscribe(
        (response) => {
          localStorage.setItem('email', this.emailFormControl.value ?? '');
          this.router.navigate(['/todo']);
        },
        (error) => {
          console.log('error', error);
        }
      )
    }
  }
  

}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

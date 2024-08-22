import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogMessageComponent } from './dialog-message.component';
import { MaterialModule } from '../../modules/shared/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('DialogMessageComponent', () => {
  let dialogRef: MatDialogRef<DialogMessageComponent>;
  let component: DialogMessageComponent;
  let fixture: ComponentFixture<DialogMessageComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogMessageComponent>>;

  beforeEach(async () => {

    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DialogMessageComponent],
      imports: [MaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
    dialogRefSpy = TestBed.inject(MatDialogRef)  as jasmine.SpyObj<MatDialogRef<DialogMessageComponent>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with the correct action', () => {
    const action = 'confirm';
    component.result(action);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(action);
  });

});

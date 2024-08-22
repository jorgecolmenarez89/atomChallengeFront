import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/shared/material.module'; 

@Component({
  selector: 'app-dialog-register',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogMessageComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  result(action: string): void {
    this.dialogRef.close(action);
  }

}

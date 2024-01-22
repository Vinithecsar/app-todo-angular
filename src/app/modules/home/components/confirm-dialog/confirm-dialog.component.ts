import { Component, EventEmitter, Output } from '@angular/core';
import { PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(public poDialog: PoDialogService) {}

  @Output() public confirmar = new EventEmitter();

  confirmDialog() {
    this.poDialog.confirm({
      title: 'Confirmação',
      message: 'Deseja realmente deletar tudo?',
      confirm: () => {
        this.confirmar.emit();
      },
      close,
    });
  }

  openDialog() {
    this.confirmDialog();
  }
}

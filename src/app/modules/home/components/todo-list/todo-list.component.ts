import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';
import { PoDialogService } from '@po-ui/ng-components';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: TaskList[] = JSON.parse(
    localStorage.getItem('list') || '[]'
  );

  constructor(public poDialog: PoDialogService) {}

  confirmDialog(index: number) {
    this.poDialog.confirm({
      title: 'Confirmação',
      message: 'Task está vazia, deseja deletar?',
      confirm: () => {
        this.deleteItemTaskList(index);
      },
      close,
    });
  }

  ngDoCheck(): void {
    if (this.taskList) {
      this.taskList.sort((first, last) => {
        return Number(first.checked) - Number(last.checked);
      });
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }

  public deleteItemTaskList(index: number) {
    this.taskList.splice(index, 1);
  }

  public deleteAllTaskList() {
    this.taskList = [];
  }

  public addTaskToList(task: string) {
    this.taskList.push({ task, checked: false });
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      this.confirmDialog(index);
    }
  }
}

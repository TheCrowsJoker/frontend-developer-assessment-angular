import { Component } from '@angular/core';
import { TodoService } from './services/todo-service.service';
import { Item } from './models/item';
import { FormControl, Validators } from '@angular/forms';
import { switchMap, map } from 'rxjs/operators';
import { itemValidator } from './directives/itemValidator';
import { sortItems } from './directives/sortItems';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'TodoList';
  items: Item[] = [];
  error: HttpErrorResponse | null = null;

  formItem = new FormControl(null, [Validators.required, itemValidator()]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getItems().subscribe({
      next: (items) => {
        this.items = sortItems(items as Item[]);
        this.error = null;
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  addItem() {
    const payload = this.formItem.value;

    if (payload) {
      this.todoService
        .addItem(payload)
        .pipe(
          switchMap(() => this.todoService.getItems()),
          map((items) => sortItems((this.items = items as Item[])))
        )
        .subscribe({
          next: () => {
            // Reset the form when an item is added
            this.reset();
            this.error = null;
          },
          error: (error) => {
            this.error = error;
          },
        });
    }
  }

  markDone(id: number, isCompleted: boolean) {
    this.todoService
      .markComplete(id, !isCompleted)
      .pipe(
        switchMap(() => this.todoService.getItems()),
        map((items) => sortItems((this.items = items as Item[])))
      )
      .subscribe({
        next: () => {
          // Reset the form when an item is added
          this.reset();
          this.error = null;
        },
        error: (error) => {
          this.error = error;
        },
      });
  }

  deleteItem(id: number) {
    this.todoService
      .deleteItem(id)
      .pipe(
        switchMap(() => this.todoService.getItems()),
        map((items) => sortItems((this.items = items as Item[])))
      )
      .subscribe({
        next: () => {
          // Reset the form when an item is added
          this.reset();
          this.error = null;
        },
        error: (error) => {
          this.error = error;
        },
      });
  }

  reset() {
    this.formItem.reset();
  }
}

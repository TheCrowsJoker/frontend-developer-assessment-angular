import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  public title = 'TodoList';
  public items: Item[] = [];
  public error: HttpErrorResponse | null = null;

  public formItem = new FormControl(null, [
    Validators.required,
    itemValidator(),
  ]);

  public constructor(private todoService: TodoService) {}

  public ngOnInit(): void {
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

  public addItem(payload: string | null): void {
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

  public markDone(id: number, isCompleted: boolean): void {
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

  public deleteItem(id: number): void {
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

  public reset(): void {
    this.formItem.reset();
  }
}

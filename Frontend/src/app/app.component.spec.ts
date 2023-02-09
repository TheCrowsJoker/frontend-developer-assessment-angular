import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { TodoService } from './services/todo-service.service';
import { default as items } from 'src/app/mock/test_data.json';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    }).compileComponents();
  });

  it('should display the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.h4')?.textContent).toContain(
      'Todo List App (Angular)'
    );
  });

  it('should display all items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.items = items.items || [];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(
      compiled.querySelector('h1[data-testId="list-heading"]')?.textContent
    ).toContain('Showing 10 Items');
  });

  it('should call service to add an item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const todoService = TestBed.inject(TodoService);
    const addItemSpy = spyOn(todoService, 'addItem').and.callThrough();

    component.addItem('Test');

    expect(addItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should call service to delete an item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const todoService = TestBed.inject(TodoService);
    const deleteItemSpy = spyOn(todoService, 'deleteItem').and.callThrough();

    component.deleteItem(1);

    expect(deleteItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should call service to mark an item as complete/incomplete', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const todoService = TestBed.inject(TodoService);
    const markCompletedSpy = spyOn(
      todoService,
      'markComplete'
    ).and.callThrough();

    component.markDone(1, true);

    expect(markCompletedSpy).toHaveBeenCalledTimes(1);
  });
});

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../todo.action';
import ToDo from '../todo.model';
import ToDoState from '../todo.state';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Title: string = '';
  IsCompleted: boolean = false;

  todoError: Error = null;

  constructor(private store: Store<{ todos: ToDoState }>) { }

  ngOnInit() {
    this.store.dispatch(ToDoActions.BeginGetToDoAction());
    this.todo$ = this.store.pipe(select('todos'));
  }

  createToDo() {
    const todo: ToDo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.Title = '';
    this.IsCompleted = false;
  }

  removeTodo(title, bol) {
    const todo: ToDo = { Title: title, IsCompleted: bol };
    this.store.dispatch(ToDoActions.RemoveToDoAction(todo));
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}

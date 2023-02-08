import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints as api } from 'src/app/constants';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(public http: HttpClient) {}

  getItems() {
    return this.http.get(api.getItems);
  }

  addItem(payload: string) {
    return this.http.post(api.addItem, {
      description: payload,
      isCompleted: false,
    });
  }

  deleteItem(id: number) {
    return this.http.delete(`${api.deleteItem}/${id}`);
  }

  markComplete(id: number, isCompleted: boolean) {
    return this.http.patch(`${api.markComplete}/${id}`, { isCompleted });
  }
}

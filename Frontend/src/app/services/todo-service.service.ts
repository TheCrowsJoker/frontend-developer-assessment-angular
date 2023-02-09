import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints as api } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public constructor(public http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getItems() {
    return this.http.get(api.getItems);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public addItem(payload: string) {
    return this.http.post(api.addItem, {
      description: payload,
      isCompleted: false,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public deleteItem(id: number) {
    return this.http.delete(`${api.deleteItem}/${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public markComplete(id: number, isCompleted: boolean) {
    return this.http.patch(`${api.markComplete}/${id}`, { isCompleted });
  }
}

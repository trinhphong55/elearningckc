import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChangeDetialFB{
  private _titleFormGroupFB: BehaviorSubject<string> = new BehaviorSubject<string>('');
  titleFromGroupFB$: Observable<string> = this._titleFormGroupFB.asObservable();

  private _titleFormPageFB: BehaviorSubject<string> = new BehaviorSubject<string>('');
  titleFromPageFB$: Observable<string> = this._titleFormPageFB.asObservable();

  setTitleFormGroupFB(text: string) {
    this._titleFormGroupFB.next(text);
  }

  setTitleFormPageFB(text: string){
    this._titleFormPageFB.next(text);
  }
}

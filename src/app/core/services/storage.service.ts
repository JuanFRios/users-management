import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private _getStorage(): Storage {
    return localStorage;
  }

  clear() {
    this._getStorage().clear();
  }

  public existsItem(textItem: string): boolean{
    return this._getStorage().getItem(textItem) != null;
  }

  getItem(textItem: string): string | undefined {
    if(!this.existsItem(textItem)){
      return undefined;
    }
    return this._getStorage().getItem(textItem);
  }

  setItem(textItem: string, value: string): void {
    this._getStorage().setItem(textItem, value);
  }

  removeItem(textItem: string): void {
    if(!this.existsItem(textItem)){
      return;
    }
    this._getStorage().removeItem(textItem);
  }
}

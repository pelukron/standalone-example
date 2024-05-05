/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subject, combineLatest, debounceTime, distinctUntilChanged, interval, map, of } from 'rxjs';

import { DOGS, Dog } from './dog.model';

@Injectable({ providedIn: 'root' })
export class DogsService {

  private _dogs$: Observable<Dog[]> = of(DOGS);
  private _dogNameSubject$: Subject<string> = new Subject<string>();
  private _dogName$: Observable<string> = this._dogName();
  private _filterList$: Observable<Dog[]> = this._filterList();

  public readonly dogsList: Signal<Dog[]> = toSignal<Dog[], Dog[]>(this._dogs$, { initialValue: [] });
  public readonly filterList: Signal<Dog[]> = toSignal(this._filterList$, { initialValue: [] as Dog[] });

  public filterDog(dogName: string): void {
    this._dogNameSubject$.next(dogName);
  }

  private _dogName(): Observable<string> {
    return this._dogNameSubject$.asObservable().pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
  }

  private _filterList(): Observable<Dog[]> {
    return combineLatest([this._dogs$, this._dogName$]).pipe(
      map(([dogs, dogName]) => {
        const dog = dogs.filter(dog => dog.name.search(dogName));
        return dog ? dog : []
      })
    );
  }

}

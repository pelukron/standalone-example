/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Injectable } from '@angular/core';
import { Subject, combineLatest, debounceTime, distinctUntilChanged, filter, map, of } from 'rxjs';
import { DOGS } from './dog.model';

@Injectable({ providedIn: 'root' })
export class DogsService {
  
  public readonly dogs$ = of(DOGS);

  private _dogName$ = new Subject<string>();
  public readonly dogName$ = this._dogName$.asObservable().pipe(
    debounceTime(1000),
    distinctUntilChanged()
  );

  public filterList$ = combineLatest([this.dogs$, this.dogName$]).pipe(
    map(([dogs, dogName]) => {
      const dog = dogs.find(dog => dog.name.search(dogName));
      return dog ? [dog] : []
    })
  );

  public filterDog(dogName: string): void {
    this._dogName$.next(dogName);
  }

}

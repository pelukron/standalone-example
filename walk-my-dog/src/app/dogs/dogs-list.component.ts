/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsService } from './dogs.service';
import { DogsListCardComponent } from './dogs-list-card.component';
import { DOGS } from './dog.model';

@Component({
  selector: 'app-dogs-list',
  standalone: true,
  imports: [CommonModule, DogsListCardComponent],
  template: `
    <section class="hero-section">
      <h2 class="hero-text">
        Discover Pets to walk near you
      </h2>
    </section>
    <input type="text" placeholder="Filter by dog name" #filter>
    <button class="primary" type="button" (click)="filterResults(filter)">Search</button>
    <article class="pet-list" *ngIf="dogsService.filterList$ | async as filterList; else showDefaultState">
      <app-dogs-list-card *ngFor="let dog of filterList; let i = index" [index]="i" [dog]="dog" />
    </article>
    <ng-template #showDefaultState>
      <article class="pet-list">
        <app-dogs-list-card *ngFor="let dog of defaultDogList; let i = index" [index]="i" [dog]="dog" />
      </article>
    </ng-template>
`,
  styles: [`
  .pet-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    padding: 10px;
  }

  .hero-text {
    font-size: 25pt;
    padding: 10px;
  }
`]
})
export class DogsListComponent implements OnInit {

  readonly defaultDogList = DOGS;

  constructor(readonly dogsService: DogsService) { }

  ngOnInit(): void {
  }


  filterResults(filter: HTMLInputElement): void {
    this.dogsService.filterDog(filter.value);
  }

}

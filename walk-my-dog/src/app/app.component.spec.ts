/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations:[AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'walk-my-dog'`, () => {
    expect(app.title).toEqual('walk-my-dog');
  });

  it('should render title', () => {
    app.title = 'walk-my-dog app is running!';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const querySelector = compiled.querySelector('.title');
    expect(querySelector?.textContent).toEqual(app.title);
  });
});

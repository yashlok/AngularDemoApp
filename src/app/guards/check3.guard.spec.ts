import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { check3Guard } from './check3.guard';

describe('check3Guard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => check3Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

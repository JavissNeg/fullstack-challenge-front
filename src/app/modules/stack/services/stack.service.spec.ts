import { TestBed } from '@angular/core/testing';

import { Stack } from './stack.service';

describe('Stack', () => {
  let service: Stack;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stack);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

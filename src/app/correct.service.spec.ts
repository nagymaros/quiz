import { TestBed } from '@angular/core/testing';

import { CorrectService } from './correct.service';

describe('CorrectService', () => {
  let service: CorrectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

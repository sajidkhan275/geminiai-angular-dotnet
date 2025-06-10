import { TestBed } from '@angular/core/testing';

import { GeminiaiService } from './geminiai.service';

describe('GeminiaiService', () => {
  let service: GeminiaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DatosMpioService } from './datos-mpio.service';

describe('DatosMpioService', () => {
  let service: DatosMpioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosMpioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

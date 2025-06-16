import { TestBed } from '@angular/core/testing';

import { AdmGuardService } from './adm-guard.service';

describe('AdmGuardService', () => {
  let service: AdmGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

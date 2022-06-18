import { TestBed } from '@angular/core/testing';

import { DocumentProccessService } from './document-proccess.service';

describe('DocumentProccessService', () => {
  let service: DocumentProccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentProccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

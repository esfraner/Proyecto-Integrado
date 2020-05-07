import { TestBed } from '@angular/core/testing';

import { PlayerCardServiceService } from './player-card-service.service';

describe('PlayerCardServiceService', () => {
  let service: PlayerCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

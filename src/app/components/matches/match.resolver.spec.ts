import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatchResolver } from './match.resolver';

describe('MatchResolver', () => {
  let resolver: MatchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(MatchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

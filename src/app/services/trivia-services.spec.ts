import { TestBed } from '@angular/core/testing';
import { TriviaService } from 'src/app/services/trivia-services';



describe('TriviaService', () => {
  let service: TriviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

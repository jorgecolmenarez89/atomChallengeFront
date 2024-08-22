import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpTestingController class

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if email is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');
    expect(service.isAuth()).toBeTrue();
  });

  it('should return false if email is not in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuth()).toBeFalse();
  });

  it('should call login with correct URL', () => {
    const email = 'test@example.com';
    service.login(email).subscribe();
    const req = httpMock.expectOne(`${service.apiUrl}/users/${email}`);
    expect(req.request.method).toBe('GET');
  });

  it('should call register with correct URL and payload', () => {
    const email = 'test@example.com';
    service.register(email).subscribe();
    const req = httpMock.expectOne(`${service.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
  });

  it('should remove email from localStorage on logout', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('email');
  });

  it('should handle error correctly', () => {
    spyOn(console, 'error');
    const error = { status: 404, message: 'Not Found' };
    service['handleError'](error).subscribe({
      error: (err) => {
        expect(console.error).toHaveBeenCalledWith(error);
        expect(err).toEqual(error);
      }
    });
  });

});

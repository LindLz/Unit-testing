import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { API_URL } from '../util/constant';
import { User } from '../interface/user';
import { MockUserList } from '../mock/user'; 

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers method', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(MockUserList);
    });

    const req = httpMock.expectOne(`${API_URL}users`);
    expect(req.request.method).toBe('GET');
    req.flush(MockUserList);
  });


  it('should call createUser method', () => {
    const newUser: User = { 
      id: 3, 
      name: 'New User',
      email: 'newuser@example.com',
      address: {
        street: '123 New User St',
        suite: 'Apt. 123',
        city: 'New User City',
        zipcode: '12345',
        geo: {
          lat: '0',
          lng: '0'
        }
      },
      phone: '123-456-7890',
      website: 'www.newuser.com',
      company: {
        name: 'New User Co.',
        catchPhrase: 'New User Catchphrase',
        bs: 'new-user-bs'
      }
    };
  
    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });
  
    const req = httpMock.expectOne(`${API_URL}users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });
  
  
  
});

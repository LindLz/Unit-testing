import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { UserService } from '../../service/user.service';
import { MockUserList } from '../../mock/user';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interface/user';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: { getUsers: () => of(MockUserList) } },
        { provide: ActivatedRoute, useValue: {  } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user list', () => {
    spyOn(userService, 'getUsers').and.returnValue(of(MockUserList as any));
    component.getUserList();
    expect(component.userList.length).toBe(MockUserList.length);
    expect(component.userList[0].id).toEqual(MockUserList[0].id);
  });

  it('should render user list', () => {
    component.userList = MockUserList as any;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('tbody tr td').textContent).toContain(MockUserList[0].id.toString());
  });
  it('should render search input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="search"]')).toBeTruthy();
  });
  
  it('should filter user list', () => {
    const testSearchValue = 'New User';
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
    component.userList = [newUser, ...MockUserList] as any;
    component.originalUserList = [newUser, ...MockUserList] as any;
    fixture.detectChanges();
  
    component.searchControl.setValue(testSearchValue);
    fixture.detectChanges();
  
    expect(component.userList.length).toBe(1);
    expect(component.userList[0].name).toEqual(testSearchValue);
  });
  
});

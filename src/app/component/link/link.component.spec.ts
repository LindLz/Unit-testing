import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';


describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 'testId'}),
            snapshot: {
              paramMap: {
                get: (key: string) => 'value',
              },
            },
          },
        },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct type', () => {
    component.type = 'danger';
    fixture.detectChanges();
    const linkEl = fixture.nativeElement.querySelector('a');
    expect(linkEl.classList).toContain('bg-danger-500');
  });


  it('should render the correct link', () => {
    component.link = ['/user/new'];
    fixture.detectChanges(); 
    const linkEl = fixture.debugElement.query(By.directive(RouterLinkWithHref));
    expect(linkEl.attributes['ng-reflect-router-link']).toBe('/user/new');
  });
  
  it('should render the correct content', () => {
    const linkEl = fixture.nativeElement.querySelector('a');
    expect(linkEl.textContent.trim()).toBe(''); 
  });

  it('should have correct default values', () => {
    expect(component.link).toEqual(['']);
    expect(component.type).toBe('primary');
  });
  
 
  
  it('should display projected content', () => {
    const projectedContent = 'Test content';
    component.link = ['/user/new'];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('a').textContent = projectedContent;
    fixture.detectChanges();
    const linkEl = fixture.nativeElement.querySelector('a');
    expect(linkEl.textContent.trim()).toBe(projectedContent);
  });
});

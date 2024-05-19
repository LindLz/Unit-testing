import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a paragraph', () => {
    fixture.detectChanges();
    element = fixture.nativeElement;

    const paragraphElement = element.querySelector('p[id="about-text"]');
    const paragraphElements = element.querySelectorAll('p');

    expect(paragraphElement).toBeTruthy();
    expect(paragraphElements.length).toBeGreaterThan(0);
  });
  
  
});

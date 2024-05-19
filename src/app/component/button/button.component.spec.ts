import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], 
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default values', () => {
    expect(component.variant).toBe('primary');
    expect(component.type).toBe('button');
    expect(component.disabled).toBe(false);
  });

  it('should apply correct classes for each variant', () => {
    const variants = ['primary', 'secondary', 'success', 'danger'] as const;
    const classes = ['bg-primary-500', 'bg-secondary-500', 'bg-success-500', 'bg-danger-500'];
    variants.forEach((variant, index) => {
      component.variant = variant;
      fixture.detectChanges();
      const buttonEl = fixture.nativeElement.querySelector('button');
      expect(buttonEl.classList).toContain(classes[index]);
    });
  });
  

  it('should set type attribute correctly', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.getAttribute('type')).toBe('submit');
  });

  it('should disable button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList).toContain('!bg-gray-200');
    expect(buttonEl.classList).toContain('!pointer-events-none');
  });
  
  it('should enable button when disabled is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList).not.toContain('pointer-events-none');
    expect(buttonEl.classList).not.toContain('bg-gray-200');
  });
  
  

  it('should render the correct content', () => {
    const projectedContent = 'Test content';
    fixture.nativeElement.querySelector('button').textContent = projectedContent;
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.textContent.trim()).toBe(projectedContent);
  });
});

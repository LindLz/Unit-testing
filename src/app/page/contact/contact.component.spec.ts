import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ContactComponent } from './contact.component'; 
import { By } from '@angular/platform-browser';


describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], 
      imports: [ReactiveFormsModule], 
    }).compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input#name')).toBeTruthy();
  });

  it('should render email input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input#email')).toBeTruthy();
  });

  it('should render phone input', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input#phone')).toBeTruthy();
  });

  it('should render comment textarea', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('textarea#comment')).toBeTruthy();
  });


  it('should disable submit button when form is invalid', () => {
    component.contactForm.controls['name'].setValue('');
    component.contactForm.controls['email'].setValue('');
    component.contactForm.controls['phone'].setValue('');
    component.contactForm.controls['comment'].setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')); 
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });
  
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskoComponent } from './kiosko.component';

describe('Kiosko', () => {
  let component: KioskoComponent;
  let fixture: ComponentFixture<KioskoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioskoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

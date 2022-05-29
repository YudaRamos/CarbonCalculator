import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportePublicoComponent } from './transporte-publico.component';

describe('TransportePublicoComponent', () => {
  let component: TransportePublicoComponent;
  let fixture: ComponentFixture<TransportePublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportePublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportePublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisNavbarComponent } from './tetris-navbar.component';

describe('TetrisNavbarComponent', () => {
  let component: TetrisNavbarComponent;
  let fixture: ComponentFixture<TetrisNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrisNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

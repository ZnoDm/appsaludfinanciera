import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtipsPage } from './protips.page';

describe('ProtipsPage', () => {
  let component: ProtipsPage;
  let fixture: ComponentFixture<ProtipsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProtipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

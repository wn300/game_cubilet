import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerGeneralComponent } from './container-general.component';

describe('ContainerGeneralComponent', () => {
  let component: ContainerGeneralComponent;
  let fixture: ComponentFixture<ContainerGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

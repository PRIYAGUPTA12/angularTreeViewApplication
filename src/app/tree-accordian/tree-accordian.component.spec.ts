import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeAccordianComponent } from './tree-accordian.component';

describe('TreeAccordianComponent', () => {
  let component: TreeAccordianComponent;
  let fixture: ComponentFixture<TreeAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeAccordianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

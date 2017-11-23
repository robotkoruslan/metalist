import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRowFormComponent } from './block-row-form.component';

describe('BlockRowFormComponent', () => {
  let component: BlockRowFormComponent;
  let fixture: ComponentFixture<BlockRowFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

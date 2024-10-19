import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaneoPostComponent } from './baneo-post.component';

describe('BaneoPostComponent', () => {
  let component: BaneoPostComponent;
  let fixture: ComponentFixture<BaneoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaneoPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaneoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

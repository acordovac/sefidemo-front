import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDocComponent } from './map-doc.component';

describe('MapDocComponent', () => {
  let component: MapDocComponent;
  let fixture: ComponentFixture<MapDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridList } from './grid-list';

describe('GridList', () => {
  let component: GridList;
  let fixture: ComponentFixture<GridList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridList],
    }).compileComponents();

    fixture = TestBed.createComponent(GridList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

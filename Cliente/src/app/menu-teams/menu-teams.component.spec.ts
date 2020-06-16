import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuTeamsComponent } from "./menu-teams.component";

describe("MenuTeamsComponent", () => {
  let component: MenuTeamsComponent;
  let fixture: ComponentFixture<MenuTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuTeamsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectItemPagePage } from './project-item-page.page';

describe('ProjectItemPagePage', () => {
  let component: ProjectItemPagePage;
  let fixture: ComponentFixture<ProjectItemPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectItemPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectItemPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

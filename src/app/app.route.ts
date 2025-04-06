import { Routes } from '@angular/router';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeAccordianComponent } from './tree-accordian/tree-accordian.component';

export const routes: Routes = [
  { path: 'tree-view', component: TreeViewComponent },
  { path: 'tree-accordian', component: TreeAccordianComponent },
  { path: '', redirectTo: 'tree-view', pathMatch: 'full' }
];

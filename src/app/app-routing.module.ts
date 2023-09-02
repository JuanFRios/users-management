import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const MAIN = '/users';

const routes: Routes = [
  { path: '', redirectTo: MAIN, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./feature/feature.module').then(i => i.FeatureModule),
  },
  { path: '**', redirectTo: MAIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'my-places',
    loadChildren: () => import('./pages/my-places/my-places.module').then( m => m.MyPlacesPageModule)
  },
  {
    path: 'place-details/:id',
    loadChildren: () => import('./pages/place-details/place-details.module').then( m => m.PlaceDetailsPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./pages/my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'edit-account',
    loadChildren: () => import('./pages/edit-account/edit-account.module').then( m => m.EditAccountPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },  {
    path: 'terms-services',
    loadChildren: () => import('./pages/terms-services/terms-services.module').then( m => m.TermsServicesPageModule)
  },
  {
    path: 'donut-shop',
    loadChildren: () => import('./pages/donut-shop/donut-shop.module').then( m => m.DonutShopPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

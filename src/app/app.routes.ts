import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { CategoryNew } from './features/pages/categories/category-new/category-new';
import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryEdit } from './features/pages/categories/category-edit/category-edit';

export const routes: Routes = [
  // No olvidar que las rutas se poner primero y se definen por su nivel de profundidad
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: 'dashboard/categories', component: CategoryList  },
  { path: 'dashboard/category/new', component: CategoryNew },
  { path: 'dashboard/category/edit/:id', component: CategoryEdit },
  // Las redirecciones van al final
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

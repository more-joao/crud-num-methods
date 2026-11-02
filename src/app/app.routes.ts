import { Routes } from '@angular/router';
import { Home } from './shared/components/home/home';
import { MethodsPage } from './shared/components/methods-page/methods-page';
import { RegistermethodPage } from './shared/components/registermethod-page/registermethod-page';
import { ImplementationPage } from './shared/components/implementation-page/implementation-page';
import { RegisterimplementationPage } from './shared/components/registerimplementation-page/registerimplementation-page';
import { NotfoundPage } from './shared/components/notfound-page/notfound-page';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'methods/register', component: RegistermethodPage },
    { path: 'methods/:id/view', component: MethodsPage },
    { path: 'methods/:id/edit', component: RegistermethodPage },
    { path: 'implementations/register', component: RegisterimplementationPage },
    { path: 'implementations/:id/view', component: ImplementationPage },
    { path: 'implementations/:id/edit', component: RegisterimplementationPage },
    { path: '**', component: NotfoundPage }
];

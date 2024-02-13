import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
    },
    {
        path: 'create',
        component: PostCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:id',
        component: PostCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {


}

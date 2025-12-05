import { Routes } from '@angular/router';
import { FirstsampleComponent } from './firstsample/firstsample.component';
 

import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { ProductTemplateDrivenComponent } from './product/product-template-driven/product-template-driven.component';
import { ProductModelDrivenComponent } from './product/product-model-driven/product-model-driven.component';
import { ProjectionComponent } from './projection/projection.component';
import { ObservableSampleComponent } from './observable-sample/observable-sample.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { authGuard } from './guards/auth.guard';
import { check1Guard } from './guards/check1.guard';
import { check2Guard } from './guards/check2.guard';
import { check3Guard } from './guards/check3.guard';
import { SignalDemoComponent } from './signal-demo/signal-demo.component';
import { MytestComponent } from './mytest/mytest.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { LoginComponent } from './login/login/login.component';
import { BlobComponent } from './blob/blob.component';
import { BlobUploadComponent } from './blob/blob-upload/blob-upload.component';

export const routes: Routes = [

     { path:'login', component: LoginComponent },

    { path: 'home', component: FirstsampleComponent },
    // { path: 'databinding', component: DatabindingComponent, canActivate: [authGuard] },
    // { path: 'dir/:id', component: DirectiveSampleComponent, canActivate: [authGuard] },
    // {
    //     path: 'pipe', component: PipeSampleComponent, canActivateChild: [check2Guard], children: [
    //         { path: 'personal', component: PersonalComponent },
    //         { path: 'education', component: EducationComponent }
    //     ]
    // },   , canActivate:[authGuard]
    {
        path: 'studentinfo', loadComponent: () => import('./student/student.component').then(c => c.StudentComponent)
        , canMatch: [check3Guard]
    },
    { path: 'studentinfo', component: FirstsampleComponent },
    { path: 'datasharing', component: CustomerAddComponent },
    { path: 'templatedriven', component: ProductTemplateDrivenComponent },
    { path: 'reactive', component: ProductModelDrivenComponent, canDeactivate: [check1Guard] },
    { path: 'projection', component: ProjectionComponent },
    { path: 'observable', component: ObservableSampleComponent },
    { path: 'product-list', component: ProductListComponent , canActivate:[authGuard] },
    { path: 'signal', component: SignalDemoComponent },
    {path: 'mytest', component: MytestComponent},
    { path: 'userlist',component: UserlistComponent , canActivate:[authGuard]},
    { path: 'blob', component: BlobComponent, canActivate:[authGuard] },
    { path: 'blob/upload', component: BlobUploadComponent, canActivate:[authGuard] },
    // { path: "**", redirectTo: 'home' }
    { path: "**", redirectTo: 'login' }
];

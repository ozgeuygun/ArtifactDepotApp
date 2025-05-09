import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtifactListComponent } from './components/artifact-list/artifact-list.component';
import { ManageArtifactComponent } from './components/admin/manage-artifact/manage-artifact.component';
import { ManageCategoryComponent } from './components/admin/manage-category/manage-category.component';
import { ManageDepotComponent } from './components/admin/manage-depot/manage-depot.component';
import { ManageDetailComponent } from './components/admin/manage-detail/manage-detail.component';
import { ManageMaterialComponent } from './components/admin/manage-material/manage-material.component';
import { ManageSiteComponent } from './components/admin/manage-site/manage-site.component';
import { ArtifactFormComponent } from './components/admin/artifact-form/artifact-form.component';
import { ArtifactMaterialService } from './services/artifact-material.service';
import { MaterialFormComponent } from './components/admin/material-form/material-form.component';
import { CategoryFormComponent } from './components/admin/category-form/category-form.component';
import { DepotFormComponent } from './components/admin/depot-form/depot-form.component';
import { DetailFormComponent } from './components/admin/detail-form/detail-form.component';
import { SiteFormComponent } from './components/admin/site-form/site-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ArtifactDepotComponent } from './components/artifact-depot/artifact-depot.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { ArtifactMapComponent } from './components/artifact-map/artifact-map.component';



export const routes: Routes = [  
    {
    path:"",
    redirectTo:'login',
    pathMatch:'full'
},
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"artifact-list",
        component:ArtifactListComponent,
        canActivate:[AuthGuard]
    },  
    {
        path:"admin/manage-artifact",
        component:ManageArtifactComponent,
        canActivate:[AuthGuard]
    } 
    , 
     {
        path:"admin/artifact/create",
        component:ArtifactFormComponent,
        canActivate:[AuthGuard]
        
    }, 
    {
        path:"admin/artifact/update/:id",
        component:ArtifactFormComponent,
        canActivate:[AuthGuard]
   
    },  
    {
        path:"admin/manage-category",
        component:ManageCategoryComponent,
        canActivate:[AuthGuard]
    } 
    , {
        path:"admin/manage-category/create",
        component:CategoryFormComponent,
        canActivate:[AuthGuard]
        
    }, 
    {
        path:"admin/manage-category/update/:id",
        component:CategoryFormComponent,
        canActivate:[AuthGuard]
   
    },
    {
        path:"admin/manage-depot",
        component:ManageDepotComponent,
        canActivate:[AuthGuard]
    } 
    , 
    {
        path:"admin/manage-detail",
        component:ManageDetailComponent,
        canActivate:[AuthGuard]
    } 
    ,  
    { 
        path:"admin/manage-material",
        component:ManageMaterialComponent,
        canActivate:[AuthGuard]
    } 
    ,  {
        path:"admin/manage-material/create",
        component:MaterialFormComponent,
        canActivate:[AuthGuard]
        
    }, 
    {
        path:"admin/manage-material/update/:id",
        component:MaterialFormComponent,
        canActivate:[AuthGuard]
   
    },
    { 
        path:"admin/manage-site",
        component:ManageSiteComponent,
        canActivate:[AuthGuard]
    },  {
        path:"admin/manage-site/create",
        component:SiteFormComponent,
        canActivate:[AuthGuard]
        
    }, 
    {
        path:"admin/manage-site/update/:id",
        component:SiteFormComponent,
        canActivate:[AuthGuard]
   
    }
    ,   {
        path:"admin/manage-depot/create",
        component:DepotFormComponent,
        canActivate:[AuthGuard]
        
    }, 
    {
        path:"admin/manage-depot/update/:id",
        component:DepotFormComponent,
        canActivate:[AuthGuard]
   
    } ,{
        path:"admin/manage-detail/create",
        component:DetailFormComponent,
        canActivate:[AuthGuard]
        
    }, 
    {
        path:"admin/manage-detail/update/:id",
        component:DetailFormComponent,
        canActivate:[AuthGuard]
   
    }, 
    {
        path:"login",
        component:LoginComponent,
   
    }, 
    {
        path:"signup",
        component:SignupComponent,
   
    }, 
    {
        path:"dashboard",
        component:DashboardComponent,
       canActivate:[AuthGuard]
    }, 
    {
        path:"artifact-depot",
        component:ArtifactDepotComponent,
        canActivate:[AuthGuard]
   
    },
    {
        path:"map-view",
        component:MapViewComponent,
   
    }, {
        path:"artifact-map",
        component:ArtifactMapComponent,
        canActivate:[AuthGuard]
   
    },
];

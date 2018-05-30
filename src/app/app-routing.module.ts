import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerGeneralComponent } from "./container-general/container-general.component";
import { FlowersComponent } from "./flowers/flowers.component";

const routes: Routes = [    
    {
        path: "index",
        component: ContainerGeneralComponent
    },
    {
        path: "flowers",
        component: FlowersComponent
    },
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
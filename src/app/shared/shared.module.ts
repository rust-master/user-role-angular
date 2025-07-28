import { NgModule } from '@angular/core';
import { RolesModule } from './roles/roles-module';

@NgModule({
    imports: [
        RolesModule,

    ],
    exports: [
        RolesModule
    ]
})
export class SharedModule { }

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularMaterialModule,
        RouterModule,
        AuthRoutingModule,
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
})
export class AuthModule {}
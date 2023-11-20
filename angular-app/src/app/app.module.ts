import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule, routes } from "./app.routes";
import { HomeComponent } from "./component/home/home.component";
import { LoginComponent } from "./component/login/login.component";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SignupComponent } from "./component/signup/signup.component";
import { RoleComponent } from "./component/role/role.component";
import { FooterComponent } from "./component/footer/footer.component";
import { HeaderComponent } from "./component/header/header.component";
import { UnauthorizedComponent } from "./component/unauthorized/unauthorized.component";
import { RobotTypeComponent } from "./component/robot-type/robot-type.component";
import { RobotComponent } from "./component/robot/robot.component";
import { BuildingComponent } from "./component/building/building.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RoleComponent,
    FooterComponent,
    HeaderComponent,
    UnauthorizedComponent,
    RobotTypeComponent,
    RobotComponent,
    BuildingComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

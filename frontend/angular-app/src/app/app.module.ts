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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./component/signup/signup.component";
import { RoleComponent } from "./component/role/role.component";
import { FooterComponent } from "./component/footer/footer.component";
import { HeaderComponent } from "./component/header/header.component";
import { UnauthorizedComponent } from "./component/unauthorized/unauthorized.component";
import { RobotTypeComponent } from "./component/robot-type/robot-type.component";
import { RobotComponent } from "./component/robot/robot.component";
import { BuildingComponent } from "./component/building/building.component";
import { FloorComponent } from "./component/floor/floor.component";
import { ConnectionComponent } from "./component/connection/connection.component";
import { RoomComponent } from "./component/room/room.component";
import { ElevatorComponent } from "./component/elevator/elevator.component";
import { MatMenuModule } from "@angular/material/menu";
import { BuildingFilterPipe } from "./services/building-filter-pipe.service";
import { LogsComponent } from "./component/logs/logs.component";
import { PathComponent } from "./component/path/path.component";
import { TaskComponent } from "./component/task/task.component";
import { UserComponent } from "./component/user/user.component";
import { AccountComponent } from "./component/account/account.component";
import { EmailFilterPipe } from "./services/email-filter-pipe.service";
import { ToastrModule } from "ngx-toastr";

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
    FloorComponent,
    ConnectionComponent,
    RoomComponent,
    ElevatorComponent,
    BuildingFilterPipe,
    LogsComponent,
    PathComponent,
    TaskComponent,
    AccountComponent,
    UserComponent,
    EmailFilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

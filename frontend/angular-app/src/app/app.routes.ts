import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FloorComponent } from "./component/floor/floor.component";
import { RoomComponent } from "./component/room/room.component";
import { ConnectionComponent} from "./component/connection/connection.component";
import { ElevatorComponent } from "./component/elevator/elevator.component";
import { BuildingComponent } from "./component/building/building.component";
import { LoginComponent } from "./component/login/login.component";
import { SignupComponent } from "./component/signup/signup.component";
import { RoleComponent } from "./component/role/role.component";
import { UnauthorizedComponent } from "./component/unauthorized/unauthorized.component";
import { AuthGuard } from "./services/auth.guard";
import { RobotComponent } from "./component/robot/robot.component";
import { RobotTypeComponent } from "./component/robot-type/robot-type.component";
import { LogsComponent } from "./component/logs/logs.component";
import { PathComponent } from "./component/path/path.component";
import { TaskComponent } from "./component/task/task.component";
import { AccountComponent } from "./component/account/account.component";
import { UserComponent } from "./component/user/user.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'building', component: BuildingComponent , canActivate: [AuthGuard]},
  { path: 'floor', component: FloorComponent , canActivate: [AuthGuard]},
  { path: 'connection', component: ConnectionComponent , canActivate: [AuthGuard]},
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'elevator', component: ElevatorComponent , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'robot', component: RobotComponent , canActivate: [AuthGuard] },
  { path: 'robot-type', component: RobotTypeComponent , canActivate: [AuthGuard] },
  { path: 'role', component: RoleComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard]},
  { path: 'path', component: PathComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

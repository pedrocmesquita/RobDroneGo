// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule} from "./app.routes";
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { BuildingListComponent } from './components/building-list/building-list.component';


@NgModule({
    declarations: [
        AppComponent,
        BuildingListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([
          { path: '', component: BuildingListComponent, pathMatch: 'full' },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

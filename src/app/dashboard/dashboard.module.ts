import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGridComponent } from './components/main-grid/main-grid.component';
import { MainComponent } from './components/main/main.component';
import { GridComponent } from '../shared/components/grid/grid.component';
import { StationsComponent } from './components/stations/stations.component';
import { MainGridStationComponent } from './components/main-grid-station/main-grid-station.component';
import { MainGridDependencieComponent } from './components/main-grid-dependencie/main-grid-dependencie.component';
import { DependencieComponent } from './components/dependencie/dependencie.component';
import { FormsModule } from '@angular/forms';
import { BarMenuComponent } from './components/bar-menu/bar-menu.component';



@NgModule({
  declarations: [
    BarMenuComponent,
    MainComponent,
    MainGridComponent,
    GridComponent,
    StationsComponent,
    MainGridStationComponent,
    MainGridDependencieComponent,
    DependencieComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DashboardModule { }

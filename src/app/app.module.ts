import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsPage } from './tabs/tabs.page';
import { HttpClientModule } from '@angular/common/http';
import { ComplainDetailPage } from './modal/complain-detail/complain-detail.page';
import { NormalizePipe } from './pipes/normalize.pipe';
import { CalendarModule } from 'ion2-calendar';
import { ConselingDirective } from './directives/conseling.directive';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = {url: ' https://conseling-chat-server.herokuapp.com/', options: {}};
@NgModule({
  declarations: [
    AppComponent, 
    TabsPage, NormalizePipe, ConselingDirective],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(), 
    AppRoutingModule, 
    CalendarModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

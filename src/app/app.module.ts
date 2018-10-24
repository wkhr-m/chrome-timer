import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './component/button/button.component';
import { MainPageComponent } from './content/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

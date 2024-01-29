import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  declarations: [
    AppComponent, 
    PostCreateComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}

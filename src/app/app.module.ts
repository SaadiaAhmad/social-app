import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [ BrowserModule, FormsModule, BrowserAnimationsModule, MatInputModule, MatButtonModule ],
  declarations: [AppComponent, PostCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {


}

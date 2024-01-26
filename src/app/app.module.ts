import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserModule, FormsModule, BrowserAnimationsModule ],
  declarations: [AppComponent, PostCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {


}

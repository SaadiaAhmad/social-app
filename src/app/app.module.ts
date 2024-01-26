import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [AppComponent, PostCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {


}

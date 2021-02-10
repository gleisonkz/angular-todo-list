import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';
import { SERVICE_TOKEN, tokenServiceFactory } from 'src/service-token';
import { AppComponent } from './app.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { CustomErrorStateMatcher } from './custom-error-state-matcher';
import { TodoStorageService } from './services/todo-storage.service';
import { TodoService } from './services/todo.service';
import { KeyPressListenerDirective } from './directives/key-press-listener.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    CustomHeaderComponent,
    KeyPressListenerDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    Storage,
    { provide: ErrorStateMatcher, useValue: new CustomErrorStateMatcher() },
    {
      provide: SERVICE_TOKEN,
      useFactory: tokenServiceFactory,
      deps: [TodoStorageService, TodoService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { ChatModule } from "./chat/chat.module";
import { LogModule } from "./services/log/log.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChatModule, FormsModule, LogModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

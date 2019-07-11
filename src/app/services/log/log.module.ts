import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { FormsModule } from "@angular/forms";
import { LogService } from "./log.service";
import { LogPublishersService } from "./log-publishers.service";

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [LogService, LogPublishersService]
})
export class LogModule {}

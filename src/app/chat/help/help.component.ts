import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";

import { HelpService } from "../../services/help.service";

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.css"]
})
export class HelpComponent implements OnInit, OnDestroy {
  public helpText = "";

  constructor(public helpService: HelpService) {}

  ngOnInit() {
    const helpData = this.helpService.getHelpText();
    this.helpText = helpData.helpText;
  }

  ngOnDestroy() {}
}

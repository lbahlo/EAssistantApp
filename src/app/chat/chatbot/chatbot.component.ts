import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { ChatService } from "../chat.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/scan";
import { SpeechRecognitionService } from "../../services/speech-recognition.service";
import { Message } from "../../models/message";
import { WindowRef } from "../../services/window-ref.service";

// import { HelpComponent } from "../help/help.component";

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  @ViewChild("rightSlideBar")
  rightSliderBarEl: ElementRef;
  public screenSize: string;

  // DialogFlow variables
  messages: Observable<Message[]>;
  title = "NAPE Assistant";
  showHelp = false;

  // constructor(public chat: ChatService, public help: HelpService) {}
  constructor(public chat: ChatService, private windowRef: WindowRef) {}

  ngOnInit() {
    this.messages = this.chat.conversation;
    this.attachWindowResizeHandler();
  }

  ngAfterViewInit() {
    if (this.rightSliderBarEl) {
      this.rightSliderBarEl.nativeElement.style.width = 0;
    }
  }

  public help() {
    this.showHelp = !this.showHelp;
    if (this.rightSliderBarEl) {
      this.showHelp
        ? (this.rightSliderBarEl.nativeElement.style.width = "auto")
        : (this.rightSliderBarEl.nativeElement.style.width = 0);
    }
  }

  private attachWindowResizeHandler() {
    const win = this.windowRef.nativeWindow;
    if (!win) {
      throw new Error("Unable to obtain window handle");
    }
    win.addEventListener("resize", () => {
      this.printResizeWidth();
    });
  }

  private printResizeWidth() {
    const container = document.querySelector(".bot-container");
    this.screenSize =
      window.outerWidth + "px" + " x  " + window.outerHeight + "px";
  }
}

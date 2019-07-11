import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { ChatService } from "../../chat.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/scan";
import { SpeechRecognitionService } from "../../../services/speech-recognition.service";
import { Message } from "../../../models/message";

@Component({
  selector: "app-message-send",
  templateUrl: "./message-send.component.html",
  styleUrls: ["./message-send.component.css"]
})
export class MessageSendComponent implements OnInit, OnDestroy {
  @ViewChild("sendButton")
  sendButtonRef: ElementRef;

  // SpeechRecognition variables
  startListenButton: boolean;
  stopListeningButton: boolean;
  speechData: string;

  // DialogFlow variables
  @Input()
  messages: Observable<Message[]>; // source is in chat.service
  public formValue: string;

  constructor(
    public chat: ChatService,
    private speechRecognitionService: SpeechRecognitionService
  ) {
    this.startListenButton = true;
    this.stopListeningButton = false;
    this.speechData = "";
  }

  ngOnInit() {
    // this.messages = this.chat.conversation;
    // this was cuasing too many sendMessage executions
    // DialogFlow setup: appends to array after each new message is added to feedSource
    // this.messages = this.chat.conversation
    //   .asObservable()
    //   .scan((acc, val) => acc.concat(val));
  }

  isBotMessage(message) {
    if (message.sentBy === "bot") {
      return true;
    } else {
      return false;
    }
  }

  sendMessage() {
    if (this.formValue === "") {
      return; // nothing to send
    }
    this.chat.converse(this.formValue);
    // this.setListener();
    this.messages.subscribe(val => console.log("component amy 1", val));
    // WIP: doesnt work. Still listens to itself
    let robotResponse: any;
    this.messages.subscribe(val => {
      console.log("component amy 1", val);
      robotResponse = val;
      const total = robotResponse.length - 1 < 0 ? 0 : robotResponse.length - 1;
      console.log("rbot length", total);
      const lastRobotResponse = robotResponse[total];
      console.log("rbot sentBy", lastRobotResponse.sentBy);
      console.log(
        "rbot start stop",
        this.startListenButton,
        this.stopListeningButton
      );
      if (total === 1 && lastRobotResponse.sentBy === "bot") {
        if (this.startListenButton && !this.stopListeningButton) {
          console.log("rbot activating speech");
          this.activateSpeechSearch();
        }
      }
    });

    this.formValue = "";
  }

  // SpeechRecognition related implementations below
  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  activateSpeechSearch(): void {
    this.startListenButton = false;

    this.speechRecognitionService.record().subscribe(
      // listener
      value => {
        this.speechData = value;
        this.formValue = value;
        console.log("listener.speechData:", value);
      },
      // error
      err => {
        console.log(err);
        if (err.error === "no-speech") {
          console.log("--restarting service--");
          this.activateSpeechSearch();
        }
      },
      // completion
      () => {
        this.startListenButton = true;
        console.log("--complete--");
        this.sendMessageFromSpeechRecognition();
        console.log("this.stopListeningButton", this.stopListeningButton);
        // if (!this.stopListeningButton) {
        //   this.activateSpeechSearch();
        // }
      }
    );
  }

  deActivateSpeechSearch(): void {
    this.startListenButton = true;
    this.stopListeningButton = true;
    this.speechRecognitionService.DestroySpeechObject();
  }

  sendMessageFromSpeechRecognition(): void {
    this.speechRecognitionService.DestroySpeechObject();
    // let user see the speech recognition text before clearing it
    setTimeout(() => {
      this.sendButtonRef.nativeElement.click();
      this.deActivateSpeechSearch(); // add to make sure we don't process the bots message as a user input
    }, 2000);
  }
}

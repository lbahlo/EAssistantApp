import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

//import { ApiAiClient } from "api-ai-javascript";
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Message } from "../models/message";
import { LogService } from "../services/log/log.service";

@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.naepAssistantBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(public logger: LogService) {}

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(
      msg,
      "user",
      "assets/images/user.png",
      new Date()
    );
    this.update(userMessage);
    // wait    this.logger.log("chat.service.convese with userMessage = " + msg);

    return this.client.textRequest(msg).then(res => {
      const speech = res.result.fulfillment.speech;
      const botMessage = new Message(
        speech,
        "bot",
        "assets/images/bot1.png",
        new Date()
      );
      this.update(botMessage);
    });
  }

  // Adds message to source
  update(msg: Message) {
    console.log("botMessage:", msg);
    console.log("botMessage:", msg.content);
    console.log("botMessage:", msg.sentBy);
    const currentValue = this.conversation.value;
    const updateValue = [...currentValue, msg];
    this.conversation.next(updateValue);
    if (msg.sentBy === "bot") {
      this.synthVoice(msg.content);
    }
  }

  // add voice to response
  synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
  }
}

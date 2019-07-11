import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChatService } from "./chat.service";
import { ChatDialogComponent } from "./chat-dialog/chat-dialog.component";
import { SpeechRecognitionService } from "../services/speech-recognition.service";
import { MessageItemComponent } from "../chat/message/message-item/message-item.component";
import { MessageListComponent } from "../chat/message/message-list/message-list.component";
import { MessageSendComponent } from "../chat/message/message-send/message-send.component";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { HelpService } from "../services/help.service";
import { HelpComponent } from "../chat/help/help.component";
import { WindowRef } from "../services/window-ref.service";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { PdfViewerComponent } from "../chat/pdf-viewer/pdf-viewer.component";

@NgModule({
  imports: [CommonModule, FormsModule, PdfViewerModule],
  declarations: [
    //  MessageItemComponent, MessageListComponent, MessageSendComponent
    HelpComponent,
    PdfViewerComponent,
    ChatbotComponent,
    MessageItemComponent,
    MessageSendComponent,
    MessageListComponent,
    ChatDialogComponent
  ],
  // exports: [ ChatDialogComponent, MessageItemComponent, MessageListComponent, MessageSendComponent  ],
  exports: [
    HelpComponent,
    PdfViewerComponent,
    ChatbotComponent,
    MessageItemComponent,
    MessageSendComponent,
    MessageListComponent,
    ChatDialogComponent
  ],
  providers: [ChatService, SpeechRecognitionService, HelpService, WindowRef]
})
export class ChatModule {}

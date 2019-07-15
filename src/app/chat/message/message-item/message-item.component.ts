import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../../../models/message';
import { userImg, bot1Img } from '../../../../assets/image-const/imageConsts'

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  userImgSource;
  bot1ImgSource;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.userImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${userImg}`);
    this.bot1ImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${bot1Img}`);

  }

}

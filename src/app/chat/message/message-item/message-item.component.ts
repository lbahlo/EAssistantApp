import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../../../models/message';
import { ImageService } from '../../../services/image/image.service'

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;


  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

}

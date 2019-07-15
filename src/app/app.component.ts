import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
//import { helpOpenImg } from '../assets/image-const/helpOpen.img'
// import { helpCloseImg } from '../assets/image-const/helpClose.img';
import { helpOpenImg, helpCloseImg } from '../assets/image-const/imageConsts'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NAEP Assistant';

  helpOpenImgSource;
  helpCloseImgSource;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit () {
    this.helpOpenImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${helpOpenImg}`);
    this.helpCloseImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${helpCloseImg}`);
  }

 }



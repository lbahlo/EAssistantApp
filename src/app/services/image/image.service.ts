import { Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { helpOpenImg, helpCloseImg, micNotActiveImg, micActive1Img, userImg, bot1Img } from './imageConsts';


export enum Images {
  helpOpenImgSource = 'helpOpenImgSource',
  helpCloseImgSource = 'helpCloseImgSource',
  micNotActiveImgSource = 'micNotActiveImgSource',
  micActiveImgSource = 'micActiveImgSource',
  userImgSource = 'userImgSource',
  bot1ImgSource = 'bot1ImgSource'
}

@Injectable()
export class ImageService {

  defaultImgSource: SafeResourceUrl;
  helpOpenImgSource: SafeResourceUrl;
  helpCloseImgSource: SafeResourceUrl;
  micNotActiveImgSource: SafeResourceUrl;
  micActiveImgSource: SafeResourceUrl;
  userImgSource: SafeResourceUrl;
  bot1ImgSource: SafeResourceUrl;

  

  constructor(private sanitizer: DomSanitizer) {
    this.defaultImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${helpOpenImg}`);
    this.helpOpenImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${helpOpenImg}`);
    this.helpCloseImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${helpCloseImg}`);
    this.micNotActiveImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${micNotActiveImg}`);
    this.micActiveImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${micActive1Img}`);
    this.userImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${userImg}`);
    this.bot1ImgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${bot1Img}`);
 
  }

  getImage(name: string):SafeResourceUrl{
     if (name === Images.helpOpenImgSource)  { return this.helpOpenImgSource; }
     if (name === Images.helpCloseImgSource) { return this.helpOpenImgSource; }
     if (name === Images.micActiveImgSource) { return this.micActiveImgSource; }
     if (name === Images.micNotActiveImgSource) { return this.micNotActiveImgSource; }
     if (name === Images.userImgSource) { return this.userImgSource; }
     if (name === Images.bot1ImgSource) { return this.bot1ImgSource; }
     return this.defaultImgSource;
  
  }


}

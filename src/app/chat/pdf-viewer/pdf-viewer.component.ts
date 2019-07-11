import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.css"]
})
export class PdfViewerComponent implements OnInit, OnDestroy {
  // public pdfSrc: string = 'assets/kba/DBA180047_Systems_MiFi and Internet Connection.pdf';
  // public pdfSrc = 'assets/pdf/help.pdf';
  public pdfSrc =
    "assets/kba/DBA180047_Systems_MiFi and Internet Connection.pdf";

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}

import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import license from './license-key.js';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library';

@Component({
  selector: 'app-foxitpdfviewer',
  template: '',
  styleUrls: ['./pdfviewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PDFViewerComponent implements OnInit {

  pdfui: any;
  constructor(
    private element: ElementRef
  ) { }

  ngOnInit() {
      this.pdfui = new UIExtension.PDFUI({
        viewerOptions: {
          libPath: '/foxit-lib',
          jr: {
            ...license,
            fontPath: location.origin + '/assets/external/brotli/'
          },
        },
        appearance: UIExtension.appearances.adaptive,
        renderTo: this.element.nativeElement,
        addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
          '/foxit-lib/uix-addons/allInOne.mobile.js' :
          '/foxit-lib/uix-addons/allInOne.js'
      });
  }

}

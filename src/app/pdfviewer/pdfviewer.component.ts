import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import license from './license-key.js';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library';
import * as Addons from '../../merged-foxit-addons.js';

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
          }
        },
        appearance: UIExtension.appearances.adaptive,
        renderTo: this.element.nativeElement,
        addons: Addons
      });
  }

}

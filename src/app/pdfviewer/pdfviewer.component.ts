import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import license from './license-key';
import * as UIExtension from '../../foxit-lib/UIExtension.full.js';

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
            fontPath: location.origin + '/foxit-lib/assets/external/brotli/'
          }
        },
        renderTo: this.element.nativeElement,
        addons: [
          '/foxit-lib/uix-addons/export-form/',
          '/foxit-lib/uix-addons/file-property/',
          '/foxit-lib/uix-addons/full-screen/',
          '/foxit-lib/uix-addons/import-form/',
          '/foxit-lib/uix-addons/multi-media/',
          '/foxit-lib/uix-addons/password-protect/',
          '/foxit-lib/uix-addons/path-objects/',
          '/foxit-lib/uix-addons/print/',
          '/foxit-lib/uix-addons/redaction/',
          '/foxit-lib/uix-addons/text-object/',
          '/foxit-lib/uix-addons/undo-redo/'
        ]
      });
  }

}

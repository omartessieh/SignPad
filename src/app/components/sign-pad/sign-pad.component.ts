import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

interface SignaturePadOptions {
  minWidth: number;
  canvasWidth: number;
  canvasHeight: number;
  penColor: string;
}

@Component({
  selector: 'app-sign-pad',
  templateUrl: './sign-pad.component.html',
  styleUrls: ['./sign-pad.component.scss'],
})
export class SignPadComponent implements OnInit {

  @ViewChild('colorPicker') colorPicker: any;
  @ViewChild(SignaturePad) signaturePad: SignaturePad | undefined;

  signaturePadOptions: SignaturePadOptions = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
    penColor: '#000000'
  };

  @Output() signImage: EventEmitter<string> = new EventEmitter<string>();

  private drawingMode: 'draw' | 'erase' = 'draw';

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.drawClear();
    this.canvasResize();
  }

  canvasResize() {
    var canvas = document.querySelector('canvas');

    if (canvas) {
      console.log(window.innerHeight);
      canvas.width = window.innerHeight;
      canvas.height = window.innerHeight - (0.19 * window.innerHeight);
    } else {
      console.error("Canvas element not found!");
    }
  }

  drawComplete() {
    const sign = this.signaturePad?.toDataURL();
    this.signImage.emit(sign);
  }

  drawStart() {
    console.log('begin drawing');
  }

  drawClear() {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }

  // toggleDrawingMode() {
  //   this.drawingMode = this.drawingMode === 'draw' ? 'erase' : 'draw';
  //   if (this.signaturePad) {
  //     this.signaturePad.set('penColor', this.drawingMode === 'draw' ? '#666a73' : '#fff'); // Set pen color to black for eraser mode
  //   }
  // }

  toggleDrawingMode() {
    const color = this.drawingMode === 'erase' ? this.colorPicker.nativeElement.value : '#fff';
    this.signaturePadOptions.penColor = color;
    this.signaturePad?.set('penColor', color);
    this.drawingMode = this.drawingMode === 'draw' ? 'erase' : 'draw';
  }

  onColorChange(event: any) {
    const color = event.target.value;
    this.signaturePadOptions.penColor = color;
    this.signaturePad?.set('penColor', color);
  }
}
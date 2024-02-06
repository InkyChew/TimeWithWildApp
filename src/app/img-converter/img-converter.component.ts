import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FileService } from '../services/file.service';
import { Observable, Observer, forkJoin } from 'rxjs';

@Component({
  selector: 'app-img-converter',
  templateUrl: './img-converter.component.html',
  styleUrls: ['./img-converter.component.css']
})
export class ImgConverterComponent implements OnInit {

  inputPath: string = "";
  outputPath: string = "";
  uniform: boolean = true;
  uniSize: ImageSize = new ImageSize();
  files: CustomImage[] = [];

  constructor(private _service: FileService) {}

  ngOnInit(): void {}

  upload(e: any) {
    const files = e.target.files;
    for(let f of files) {
      if (f.size > 0) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const url = e.target.result;
          this.files.push(new CustomImage(url, f.name))
        };
        reader.readAsDataURL(f);
      }
    }
  }

  imgOnLoad(img: any, file: CustomImage) {
    file.inWidth = img.naturalWidth;
    file.inHeight = img.naturalHeight;
    file.width = img.naturalWidth;
    file.height = img.naturalHeight;
  }
  setUniRatio(e: any) {
    const v = e.target.checked;
    this.uniSize.keepRatio = v;
    this.files.forEach(f => f.keepRatio = v);
  }
  setUniWidth(e: any) {
    this.setWidth(e, this.uniSize);
    this.files.forEach(f => {
      this.setWidth(e, f);
    });
  }
  setUniHeight(e: any) {
    this.files.forEach(f => {
      this.setHeight(e, f);
    });
  }
  
  setWidth(e: any, f: ImageSize) {
    const w = +e.target.value;
    if(f.keepRatio) {
      const ratio = f.inWidth / f.inHeight;
      f.width = w;
      f.height = Math.round(w / ratio);
    } else f.width = w;
  }
  setHeight(e: any, f: ImageSize) {
    const h = +e.target.value;
    if(f.keepRatio) {
      const ratio = f.inHeight / f.inWidth;
      f.height = h;
      f.width = Math.round(h / ratio);
    } else f.height = h;
  }

  convert() {
    const zip = this._service.createZip();
    const folderName = `images.zip`;

    const createZipFileObservables = this.files.map(f => {
      const ConvertExt = "webp";
      const img = new Image();
      img.src = f.url;
      
      var canvas = document.createElement('canvas');
      canvas.width = f.width;
      canvas.height = f.height;
      var ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, f.width, f.height);
      
      return new Observable((observer: Observer<void>) => {
        canvas.toBlob(b => {
          if(b) {
            const fileName = `${f.name}.${ConvertExt}`;
            this._service.createZipFile(zip, fileName, b);
            observer.next();
            observer.complete();
          }
        }, "image/webp");
      });
    });
    
    forkJoin(createZipFileObservables).subscribe(() => {
      this._service.generateZipAndSave(zip, folderName);
    });
  }
}

class ImageSize {
  inWidth: number = 0;
  inHeight: number = 0;
  width: number = 0;
  height: number = 0;
  keepRatio: boolean = true;
}

class CustomImage extends ImageSize {
  url: string;
  name: string;

  constructor(url: string, n: string) {
    super();
    this.url = url;
    this.name = n.split('.')[0];
  }
}
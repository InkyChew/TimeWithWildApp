import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  createZip(): JSZip {
    return new JSZip();
  }

  createZipFolder(zip: JSZip, folderName: string): JSZip {
    const folder = zip.folder(folderName);
    if(!folder) throw new Error('Zip folder failed to create.');
    return folder;
  }

  createZipFile(zip: JSZip, fileName: string, blob: Blob) {
    zip.file(fileName, blob);
  }

  generateZipAndSave(zip: JSZip, folderName: string) {
    zip.generateAsync({type:"blob"}).then(function(content) {
      saveAs(content, folderName);
    });
  }
}

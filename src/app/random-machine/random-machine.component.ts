import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
const HEIGHT: number = 300;

@Component({
  selector: 'app-random-machine',
  templateUrl: './random-machine.component.html',
  styleUrls: ['./random-machine.component.css']
})
export class RandomMachineComponent implements OnInit {

  ideaList?: Idea[];
  targetIdea?: Idea;
  transform: string = "translateY(0px)";

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get<Idea[]>('/assets/place.json').subscribe(res => {
      this.ideaList = res;
      this.targetIdea = res[0];
    });
  }

  reset() {
    if(this.ideaList) {
      this.transform = `translateY(0px)`;
      this.targetIdea = this.ideaList[0];
    }
  }

  start() {
    if(this.ideaList) {
      let i = 0;
      const r = Math.floor(Math.random() * this.ideaList.length);
      const y = HEIGHT * (this.ideaList.length-1);
      while(i <= r) {
        this.ideaList?.push(this.ideaList[0]);
        this.ideaList?.splice(0, 1);
        i++;
      }
      this.transform = `translateY(${-y}px)`;
    }
  }
}

export interface Idea {
  id: number,
  type: string,
  name: string,
  title: string,
  img: string,
  url: string
}

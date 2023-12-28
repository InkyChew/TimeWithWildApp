import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, delay, observable, of, switchMap, timer } from 'rxjs';
const HEIGHT: number = 300;

@Component({
  selector: 'app-random-machine',
  templateUrl: './random-machine.component.html',
  styleUrls: ['./random-machine.component.css']
})
export class RandomMachineComponent implements OnInit {

  ideaList?: Idea[];
  targetIdea?: Idea;
  isStart: boolean = false;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get<Idea[]>('/assets/place.json').subscribe(res => {
      this.ideaList = res;
      this.targetIdea = res[0];
    });
  }
  
  transform(state: SlideState): string {
    let stt = "";
    switch(state) {
      case SlideState.Prev:
        stt = "prev";
        break;
      case SlideState.Active:
        stt = "active";
        break;
      case SlideState.Next:
        stt = "next";
        break;
    }
    return stt;
  }

  start() {
    if(this.ideaList) {
      this.isStart = true;
      this.ideaList[0].state = SlideState.Prev;
      this.ideaList[1].state = SlideState.Active;
    }
  }
  
  stop() {
    this.isStart = false;
  }

  tend(idea: Idea) {
    if(this.ideaList) {
      switch(idea.state) {
        case SlideState.Prev:
          idea.state = SlideState.None;
          break;
        case SlideState.Active:
          idea.state = SlideState.None;
          of(null).pipe(
            switchMap(() => {
              this.ideaList?.push(this.ideaList[0]);
              this.ideaList?.splice(0, 1);
              return of(null).pipe(delay(0));
            })
          ).subscribe(() => {
            if(this.isStart) this.start();
            else this.targetIdea = idea;
          });
        break;
      }
    }
  }
}

export interface Slide {
  state: SlideState
}

export enum SlideState {
  None,
  Prev,
  Active,
  Next
}
export interface Idea extends Slide {
  id: number,
  type: string,
  name: string,
  title: string,
  img: string,
  url: string
}
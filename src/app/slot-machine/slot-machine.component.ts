import { Component, OnInit } from '@angular/core';
import { Slide, SlideState } from '../random-machine/random-machine.component';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.css']
})
export class SlotMachineComponent implements OnInit {

  dishes!: Product[];
  fruits!: Product[];
  drinks!: Product[];
  desserts!: Product[];

  dishesData = ['🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🍳', '🥘', '🍲', '🥣', '🥗', '🍝', '🍱', '🍙', '🍛', '🍜', '🍠', '🍢', '🍣', '🍤', '🥮', '🥟', '🥠', '🥡'];
  fruitsData = ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍑', '🍒', '🍓', '🥝', '🍅', '🥥'];
  dessertsData = ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", '🍡'];
  drinksData = ["🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧃", "🧉", "🍯"];

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  start() {
    for(let i = 0; i < this.dishes.length; i++) {
      
    }
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

  initData() {
    this.shuffle(this.dishesData);
    this.shuffle(this.fruitsData);
    this.shuffle(this.dessertsData);
    this.shuffle(this.drinksData);
  
    this.dishes = this.dishesData.map(_ => new Product(_));
    this.fruits = this.fruitsData.map(_ => new Product(_));
    this.desserts = this.dessertsData.map(_ => new Product(_));
    this.drinks = this.drinksData.map(_ => new Product(_));
  }

  shuffle(list: string[]) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
  }
}

export class Slot implements Slide {
  state: SlideState = SlideState.None
  duration: number = 0;
}

export class Product extends Slot {
  name: string;

  constructor(name: string) { 
    super();
    this.name = name 
  } 
}
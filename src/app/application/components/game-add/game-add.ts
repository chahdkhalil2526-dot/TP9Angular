import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { GameService } from '../../../service/game-service';
@Component({
  imports: [FormField, FormRoot],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd implements OnInit  {
  
  categories = Object.values(Category);
  gameService= inject(GameService);

  readonly gameModel = signal<Game>({
    id:"" ,
    name: "",
    price:0,
    madeIn:"Tunisie",
    category:Category.Puzzle,
    isNew:true,
    shops: []
  });

  readonly gameForm = form(this.gameModel);

  onSubmit(){
    console.log(this.gameModel());
    this.gameService.addGame(this.gameModel()).subscribe();
  }

  ngOnInit(): void {
    this.gameService.getGame().subscribe();
  }

  resetForm (){
    this.gameModel.set({
      id:"" ,
      name: "",
      price:0,
      madeIn:"Tunisie",
      category:Category.Puzzle,
      isNew:true,
      shops: []
    })
  }

}

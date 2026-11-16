import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { form, FormField, FormRoot, min, pattern, required } from '@angular/forms/signals';
import { GameService } from '../../../service/game-service';
import { JsonPipe } from '@angular/common';
@Component({
  imports: [FormField, FormRoot,JsonPipe],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd implements OnInit  {
  
  categories = Object.values(Category);
  gameService= inject(GameService);
  games=this.gameService.games;

  readonly gameModel = signal<Game>({
    id:"" ,
    name: "",
    price:0,
    madeIn:"Tunisie",
    category:Category.Puzzle,
    isNew:true,
    shops: []
  });

  readonly gameForm = form(this.gameModel, path => {
    required(path.name,{message : "Nom Obligatoire"}),
    pattern(path.name,/^[A-Z].+$/,{message : "Format incorrect"}),
    required(path.price,{message:"Prix obligatoire"}),
    min(path.price,0.1,{message :"Prix minimal : 0.1DT"})
  });

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

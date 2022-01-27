import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {  // 비동기로 동작하기 위해 Observable을 사용하여 함수를 작성한다.
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;                   // Observable타입을 반환
  }

  /*getHeroes(): Hero[] {      // 서버의 응답을 기다려야하는 동기식처리이다.
    return HEROES;
  }*/
}

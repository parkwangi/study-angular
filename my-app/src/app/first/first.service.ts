import { Injectable } from '@angular/core';

@Injectable({                // @Injectable 데코레이터는 자신의 아래에 정의된 클래스가 의존성 주입이 가능한 클래스임을 나타낸다.
  providedIn: 'root'
})
export class FirstService {

  constructor() { }
  sayHi() { return 'Hello!'; }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // 웹 API 형식의 URL로 사용

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /*getHeroes(): Observable<Hero[]> {  // 비동기로 동작하기 위해 Observable을 사용하여 함수를 작성한다.
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;                   // Observable타입을 반환
  }*/

  /** GET: 서버에서 히어로 목록 가져오기 */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),                   // tap은 옵저버블 데이터를 사용해서 어떤 동작을 수행 하는데, 옵저버블 데이터는 변경하지 않고 그대로 전달한다.
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /*getHeroes(): Hero[] {      // 서버의 응답을 기다려야하는 동기식처리이다.
    return HEROES;
  }*/

  /** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다. */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /*getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);             // Observable타입을 반환
  }*/

  /** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: 서버에 새로운 히어로를 추가합니다. */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: 서버에서 히어로를 제거합니다. */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환합니다.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시한다. */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

/**
 * HTTP 요청이 실패한 경우를 처리한다.
 * 애플리케이션 로직 흐름은 그대로 유지
 * @param operation - 실패한 동작의 이름
 * @param result - 기본값으로 반환할 객체
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
}

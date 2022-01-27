import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Name } from '../name';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  @Input() english!:Name;         // english 프로퍼티를 외부에서 바인딩할때 wangi라는 이름으로 사용하기 위한 선언 (! 느낌표는 지금당장 속성을 신경쓰지않아도 된다는 의미이다.)
  @Input() tell = '';             // fullname 프로퍼티를 외부에서 바인딩할때 wangi라는 이름으로 사용하기 위한 선언
  // 즉 @Input은 부모->자식, @Output은 자식->부모
  @Output() voted = new EventEmitter<boolean>();  // 자식 컴포넌트에서 외부로 이벤트를 보내기위해 EventEmitter 타입으로 선언한 프로퍼티에 @Ouput 데코레이터를 사용하여 출력 프로퍼티 지정
  didVote = false;

  second = 546;

  vote(agreed:boolean){
    this.voted.emit(agreed);      // 버튼을 누르면 boolean타입의 데이터를 전달
    this.didVote = true;
  }


  constructor() { }

  ngOnInit(): void {
  }

}

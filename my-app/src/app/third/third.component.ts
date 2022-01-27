import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirstService } from '../first/first.service';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {
  @Input() size!: number;                                // 커스텀 양방향 바인딩을 하기위해서는 @Input과 @Output데코레이터가 필요하다.
  @Output() sizeChange = new EventEmitter<number>();     // 커스텀 양방향 바인딩을 하려면 @Output 프로퍼티이름은 @Input 프로퍼티에서 Change를 붙여야한다.


  firstservice: FirstService;

  up() { this.resize(-1); }
  down() { this.resize(+1); }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }

  constructor() {
    this.firstservice = new FirstService();           // 서비스의 인스턴트를 직접 생성한다.
   }


  ngOnInit(): void {
  }

}

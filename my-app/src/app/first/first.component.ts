import { Component, OnInit, ViewChild } from '@angular/core';
import { Names } from '../name';
import { SecondComponent } from '../second/second.component';

@Component({
  selector: 'app-firtst',                         // 컴포넌트 셀렉터를 지정하여 템플릿에서 지정한 이름으로 사용가능
  templateUrl: './first.component.html',          // 컴포넌트가 렌더링 될 모습을 지정하는 html 조각
  styleUrls: ['./first.component.css']            // 템플릿에 지정될 컴포넌트르 스타일을 불러오기 위해 사용
})
export class FirstComponent implements OnInit {
  @ViewChild(SecondComponent)                     // 자식 컴포넌트의 프로퍼티를 부모 컴포넌트가 직접 변경하고, 자식 컴포넌트의 메소드를 직접 실행 할 수 있음.
  disable: SecondComponent = new SecondComponent; // 만일 disble이 리스트 형태이면 @ViewChild대신 @ViewChildren을 사용한다.
  englishname = Names;
  say = 'hi';
  agreed = 0;
  disagreed = 0;
  birthday = new Date(2022, 3, 4);                // 월은 0부터 시작한다.
  abc(){
    this.disable.tell = "hello";                  // viewchild를 이용한 diable을 통해 자식 컴포넌트의 tell 프로퍼티의 값을 변경시킬 수 있다.
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }

  constructor() { }

  ngOnInit(): void {                             // angular가 입력 프로퍼티를 검사한 직후 실행된다. 인스턴스 초기화 로직으로 사용할 수 있다.
  }

  ngOnChanges(): void{                           /* ngOnInit()이 실행되기 전에 한 번 실행되며 입력 프로퍼티(@Input 데코레이터가 적용된 프로퍼티)로
                                                    바인딩된 값이 변경될 때마다 실행됩니다. 즉 프로퍼티의 변화가 감지되면 호출된다.   (SimpleChanges객체를 통해 이전 값과 현재 값을 받을 수 있다.)*/
  }

  ngDoCheck(): void{                             // ngOnInit()이 실행된 직후에 한 번 실행되며, ngOnChange()가 실행된 이후에 매번 실행된다. Angular가 감지못하는 변화를 감지하는 용도로 쓰인다.
  }

  ngAfterContentInit(): void{                    // ngDoCheck()가 처음 실행된 후 한 번 실행된다. 컴포넌트의 템플릿을 컴포넌트 뷰로 준비하거나 뷰 안에 있는 디렉티브를 준비한 이후에 실행된다.
  }

  ngAfterContentChecked(): void{                 // ngAfterContentInit()이 실행된 후, ngDoCheck()가 실행된 이후마다 실행된다. 디렉티브나 컴포넌트의 뷰를 검사한 이후에 실행된다.
  }

  ngAfterViewInit(): void{                       // ngAfterContentChecked()가 처음 실행된 후에 한 번 실행된다. 컴포넌트 뷰와 자식 컴포넌트 뷰, 뷰 안에 있는 디렉티브가 준비되었는지 검사한 후 실행한다.
  }

  ngAfterViewChecked(): void{                    // ngAfterViewInit()가 실행된 후, ngAfterContentChecked()가 실행된 이후마다 실행된다. 컴포넌트나 디렉티브 화면과 자식 화면을 검사한 후에 실행한다.
  }

  ngOnDestroy(): void{                           /* 디렉티브나 컴포넌트가 종료되기 직전에 실행된다. 옵저버블 구독해제, 이벤트 핸들러를 제거해서 메모리 누수 방지
                                                     컴포넌트가 종료되는 것을 애플리케이션의 다른 부분에 전파할 수 있는 시점*/
  }
   // ngOnChanges, ngDoCheck, ngAfterContentChecked, ngAfterViewChecked 에는 간결한 로직만 작성하는 것이 좋다.
}

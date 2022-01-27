import { Component } from '@angular/core';

@Component({                                // 컴포넌트를 생성 : ng generate component <컴포넌트 이름>
  selector: 'app-root',                     // 컴포넌트 셀렉터를 지정하여 템플릿에서 지정한 이름으로 사용가능
  templateUrl: './app.component.html',      // 컴포넌트가 렌더링 될 모습을 지정하는 html 조각
  styleUrls: ['./app.component.css']        // 템플릿에 지정될 컴포넌트르 스타일을 불러오기 위해 사용
})
export class AppComponent {
  mytext = "wangi";
  title = 'my-app';
  fontSizePx = 16;


}



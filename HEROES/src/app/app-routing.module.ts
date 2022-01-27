import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // path가 빈 문자열이면 자동으로 /dashboard 주소로 이동하게 된다.
  { path: 'heroes', component: HeroesComponent },            // path는 URL과 매칭될 문자열을 지정, component는 라우터가 생성하고 화면에 표시할 컴포넌트를 지정 ex) localhost:4200/heroes
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

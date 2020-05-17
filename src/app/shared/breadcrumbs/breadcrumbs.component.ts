import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;

  constructor(private _router: Router, private _title : Title) {
    this.getDataRoute().subscribe((x) => {
      this.titulo = x.titulo;
      this._title.setTitle(this.titulo);
    });
  }

  ngOnInit() {}

  getDataRoute(): Observable<any> {
    return this._router.events.pipe(
      filter((x) => x instanceof ActivationEnd),
      filter((x: ActivationEnd) => x.snapshot.firstChild === null),
      map((x: ActivationEnd) => x.snapshot.data)
    );
  }
}

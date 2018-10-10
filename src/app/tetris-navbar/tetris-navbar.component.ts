import { Component, OnInit, Input } from '@angular/core';
import { Link } from 'src/domain/Link';

@Component({
  selector: 'app-tetris-navbar',
  templateUrl: './tetris-navbar.component.html',
  styleUrls: ['./tetris-navbar.component.css']
})
export class TetrisNavbarComponent implements OnInit {

  @Input() links: Link[];

  constructor() { }

  ngOnInit() {
  }

}

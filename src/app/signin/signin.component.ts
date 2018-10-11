import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../core/player.service';
import { GoogleService } from '../social/google.service';

@Component({
  selector: 'ds-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: GoogleService) { }

  ngOnInit() {
  }

}

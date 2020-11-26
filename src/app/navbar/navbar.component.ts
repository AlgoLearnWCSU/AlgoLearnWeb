import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	links = [
		{ title: 'Home', path: '/home' },
		{ title: 'Learn', path: '/learn' },
		{ title: 'Practice', path: '/problem' },
		{ title: 'Contact', path: '/contact' },
	];

	constructor(public location: Location) {
	}

	ngOnInit(): void {
	}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	links = [
		{ title: 'Home', path: '/home' },
		{ title: 'Page 2', path: '/page1' },
		{ title: 'Page 3', path: '/page2' },
		{ title: 'Page 4', path: '/page3' },
	];

	constructor(public route: ActivatedRoute) {
	}

	ngOnInit(): void {
	}

}

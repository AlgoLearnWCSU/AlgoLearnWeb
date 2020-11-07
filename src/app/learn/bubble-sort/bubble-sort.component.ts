import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bubble-sort',
	templateUrl: './bubble-sort.component.html',
	styleUrls: ['./bubble-sort.component.scss']
})
export class BubbleSortComponent implements OnInit {

	arr: number[];
	i = 0;
	j = 0;

	constructor() { }

	ngOnInit(): void {
		this.randomize();
	}

	randomize() {
		this.arr = [];
		this.i = 0;
		this.j = 0;
		for (let i = 0; i < 10; ++i) {
			this.arr.push(Math.floor(Math.random() * 100));
		}
	}

	bubbleSort() {
		for (let i = 0; i < this.arr.length - 1; ++i) {
			for (let j = 0; j < this.arr.length - i - 1; ++j) {
				if (this.arr[j] > this.arr[j + 1]) {
					const temp = this.arr[j];
					this.arr[j] = this.arr[j + 1];
					this.arr[j + 1] = temp;
				}
			}
		}
	}

	nextStep() {
		if (this.i < this.arr.length - 1) {
			if (this.j < this.arr.length - this.i - 1) {
				if (this.arr[this.j] > this.arr[this.j + 1]) {
					const temp = this.arr[this.j];
					this.arr[this.j] = this.arr[this.j + 1];
					this.arr[this.j + 1] = temp;
				}
				++this.j;
				if (this.j >= this.arr.length - this.i - 1) {
					this.j = 0;
					++this.i;
				}
			}
		}
	}
}

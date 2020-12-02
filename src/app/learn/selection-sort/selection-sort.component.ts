import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-selection-sort',
	templateUrl: './selection-sort.component.html'
})
export class SelectionSortComponent implements OnInit {
	arr: number[];
	i = 0;
	j = 0;


	selectionSortJSCode = `function selectionSort(arr){
		let len = arr.length;
		for (let i = 0; i < len; i++) {
			let min = i;
			for (let j = i + 1; j < len; j++) {
				if (arr[min] > arr[j]) {
					min = j;
				}
			}
			if (min !== i) {
				let tmp = arr[i];
				arr[i] = arr[min];
				arr[min] = tmp;
			}
		}
		return arr;
	}`
	selectionSortExplanation = `	Step 1 − Set min to location 0
	Step 2 − Search the minimum element in the array
	Step 3 − Swap with value at location of min
	Step 4 − Increment min to point to next element
	Step 5 − Repeat until list is sorted	`

	constructor() {

	}
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
	selectionSort() {
		let len = this.arr.length;
		for (let i = 0; i < len; i++) {
			let min = i;
			for (let j = i + 1; j < len; j++) {
				if (this.arr[min] > this.arr[j]) {
					min = j;
				}
			}
			if (min !== i) {
				let tmp = this.arr[i];
				this.arr[i] = this.arr[min];
				this.arr[min] = tmp;
			}
		}
		return this.arr;
	}
	nextStep() {

		if (this.i < this.arr.length) {
			let min = this.i;
			if (this.j < this.i + 1) {
				if (this.arr[min] < this.arr[this.j]) {
					min = this.j;
				}
			}
			if (min !== this.i) {
				let tmp = this.arr[this.i];
				this.arr[this.i] = this.arr[min];
				this.arr[min] = tmp;
			}
			++this.j;
			if (this.j >= this.i + 1) {
				this.j = 0;
				++this.i;
			}
		}

	}
}


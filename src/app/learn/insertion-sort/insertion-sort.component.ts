import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-insertion-sort',
	templateUrl: './insertion-sort.component.html'
})
export class InsertionSortComponent implements OnInit {

	arr: number[] = [];
	i = 0;
	j = 0;

	insertionSortJSCode = `function insertionSort() {
		for (let i = 1; i < arr.length; ++i) {
			for (let j = i; j > 0; --j) {
				if (arr[j-1] > arr[j]) {
					var tempInt = arr[j];
					arr[j] = arr[j-1];
					arr[j-1] = tempInt;
				}
			}
		}
	}
`

	insertionSortPseudoCode = `i ← 1
while i < length(A)
	j ← i
	while j > 0 and A[j-1] > A[j]
		swap A[j] and A[j-1]
		j ← j - 1
	end while
	i ← i + 1
end while
`
	
	constructor() { 
		this.randomize();
	}

	ngOnInit(): void {
	}

	randomize() {
		this.arr = [];
		this.i = 0;
		this.j = 0;
		for (let i = 0; i < 10; ++i) {
			this.arr.push(Math.floor(Math.random() * 100));
		}
	}

	insertionSort() {
		for (let i = 1; i < this.arr.length; ++i) {
			for (let j = i; j > 0; --j) {
				if (this.arr[j-1] > this.arr[j]) {
					var tempInt = this.arr[j];
					this.arr[j] = this.arr[j-1];
					this.arr[j-1] = tempInt;
				}
			}
		}
	}

	nextStep() {
		if (this.j <= 0) {
			++this.i;
			this.j = this.i;
		}
		if (this.i < this.arr.length) {
			if (this.arr[this.j] < this.arr[this.j-1]) {
				var tempInt = this.arr[this.j];
				this.arr[this.j] = this.arr[this.j-1]
				this.arr[this.j-1] = tempInt;
			}
			--this.j;
		}
	}
}

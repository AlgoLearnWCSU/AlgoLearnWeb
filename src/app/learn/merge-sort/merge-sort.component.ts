import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-merge-sort',
	templateUrl: './merge-sort.component.html',
	styleUrls: ['./merge-sort.component.scss']
})
export class MergeSortComponent implements OnInit {

	arr: number[];
	workArr: number[];
	workArrIdx: number;
	stepCount = 0;
	split = 0;
	merge1 = 0;
	merge2 = 0;
	comp1 = 0;
	comp2 = 0;

	nextStack = [{
		func: 'Splitting',
		arguments: [0, 10]
	}];

	mergeSortJSCode =
		`function mergeSort(arr) {
	split(arr, arr2, 0, arr.length());
}

function split(arr, arr2, begin, end) {
	if (end - begin <= 1) 
		return;
	middle = Math.floor((end + begin) / 2);
	split(arr, arr2, begin, middle);
	split(arr, arr2, middle, end);
	merge(arr, arr2, begin, middle, end);
}

function merge(arr, begin, middle, end) {
	i = begin;
	j = middle;
	for (k = begin; k < end; ++k) {
		if (i < middle && (j >= end || arr[i] <= arr[j])) {
			arr2[k] = arr[i];
			++i;
		}
		else {
			arr2[k] = arr[j];
			++j;
		}
	}
	return arr2;
}`;

	mergeSortPseudoCode =
		`function mergeSort(arr[0..n]) {
	split(arr, 0, n)
}

function split(arr[0,n], arr2[0..n], begin, end) {
	if (end - begin <= 1) 
		return
	middle <- floor((end + begin) / 2)
	split(arr, arr2, begin, middle)
	split(arr, arr2, middle, end)
	merge(arr, arr2, begin, middle, end)
}

function merge(arr[0,n], begin, middle, end) {
	i <- begin
	j <- middle
	for (k <- begin, k < end; ++k) {
		if (i < middle AND (j >= end OR arr[i] <= arr[j])) {
			arr2[k] = arr[i]
			++i
		}
		else {
			arr2[k] <- arr[j]
			++j
		}
	}
	return arr2
}
`;

	constructor() { }

	ngOnInit(): void {
		this.randomize();
	}

	randomize() {
		this.arr = [];
		this.workArr = [];
		this.stepCount = 0;
		this.split = null;
		this.merge1 = null;
		this.merge2 = null;
		this.comp1 = null;
		this.comp2 = null;
		for (let i = 0; i < 10; ++i) {
			this.arr.push(Math.floor(Math.random() * 100));
			this.workArr.push(this.arr[i]);
		}
		this.nextStack = [{
			func: 'Splitting',
			arguments: [0, 10]
		}];
	}

	mergeSort() {
		this.splitMerge(0, 10);
		this.stepCount = null;
	}

	splitMerge(iBegin: number, iEnd: number) {
		if (iEnd - iBegin <= 1)
			return;
		let iMiddle = Math.floor((iEnd + iBegin) / 2);
		this.splitMerge(iBegin, iMiddle);
		this.splitMerge(iMiddle, iEnd);
		this.merge(iBegin, iMiddle, iEnd);
	}

	merge(iBegin: number, iMiddle: number, iEnd: number) {
		let i = iBegin;
		let j = iMiddle;
		for (let k = iBegin; k < iEnd; ++k) {
			if (i < iMiddle && (j >= iEnd || this.arr[i] <= this.arr[j])) {
				this.workArr[k] = this.arr[i];
				++i;
			}
			else {
				this.workArr[k] = this.arr[j];
				++j;
			}
		}
		for (let index = 0; index < 10; ++index)
			this.arr[index] = this.workArr[index];
	}

	splitMergeNext(params: number[]) {
		let iBegin = params[0];
		let iEnd = params[1];
		if (iEnd - iBegin <= 1)
			return;
		let iMiddle = Math.floor((iEnd + iBegin) / 2);
		this.nextStack.push({
			func: 'Merging',
			arguments: [iBegin, iMiddle, iEnd]
		});
		this.nextStack.push({
			func: 'Splitting',
			arguments: [iMiddle, iEnd]
		});
		this.nextStack.push({
			func: 'Splitting',
			arguments: [iBegin, iMiddle]
		});
	}

	mergeNext(params: number[]) {
		let iBegin = params[0];
		let iMiddle = params[1];
		let iEnd = params[2];
		let i = iBegin;
		let j = iMiddle;
		for (let k = iBegin; k < iEnd; ++k) {
			if (i < iMiddle && (j >= iEnd || this.arr[i] <= this.arr[j])) {
				this.workArr[k] = this.arr[i];
				++i;
			}
			else {
				this.workArr[k] = this.arr[j];
				++j;
			}
		}
		for (let index = 0; index < 10; ++index)
			this.arr[index] = this.workArr[index];
	}

	nextStep() {
		if (this.nextStack.length === 0) {
			return;
		}
		const step = this.nextStack.pop();
		if (step.func === 'Splitting') {
			this.splitMergeNext(step.arguments);
		} else if (step.func === 'Merging') {
			this.mergeNext(step.arguments);
		}
	}
}
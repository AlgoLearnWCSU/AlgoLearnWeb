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

	mergeSortJSCode = 'test';

	mergeSortPseudoCode = 'test';

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

		/*if (this.stepCount != null) {
			let temp = 0;
			switch(this.stepCount) {
				case 0:
					this.split = 5; 
					break;
				case 1:
					this.split = 2;
					break;
				case 2:
					this.split = 1;
					break;
				case 3:
					this.split = 0;
				case 4: 
					this.split = null;
					this.merge1 = 0;
					this.merge2 = 1;
					break;
				case 5: 
					this.merge1 = null;
					this.merge2 = null;
					this.comp1 = 0;
					this.comp2 = 1;
				case 6:
					if (this.arr[0] > this.arr[1]) {
						temp = this.arr[0];
						this.arr[0] = this.arr[1];
						this.arr[1] = temp;
					}
					this.comp1 = null;
					this.comp2 = null;
					this.split = 3; 
					break;
				case 7:
					this.split = null;
					this.merge1 = 2;
					this.merge2 = 3;
					break;
				case 8:
					this.merge1 = null;
					this.merge2 = null;
					this.comp1 = 2;
					this.comp2 = 3;
					break;
				case 9:
					if (this.arr[2] > this.arr[3]) {
						temp = this.arr[2];
						this.arr[2] = this.arr[3];
						this.arr[3] = temp;
					}
					this.comp1 = null;
					this.comp2 = null;
					this.split = 4;
					break;
				case 10:
					this.split = null;
					this.merge1 = 4;
					this.merge2 = 5;
					break;
				case 11:
					this.merge1 = null;
					this.merge2 = null;
					this.comp1 = 4;
					this.comp2 = 5;
					break;
				case 12:
					if (this.arr[4] > this.arr[5]) {
						temp = this.arr[4];
						this.arr[4] = this.arr[5];
						this.arr[5] = temp;
					}
					this.comp1 = null;
					this.comp2 = null;
					this.split = 8;
					break;
				case 13:
					this.split = 7;
					break;
				case 14:
					this.split = 6;
					break;
				case 15:
					this.split = null;
					this.merge1 = 6;
					this.merge2 = 7;
					break;
				case 16:
					this.merge1 = null;
					this.merge2 = null;
					this.comp1 = 6;
					this.comp2 = 7;
					break;
				case 17:
					if (this.arr[6] > this.arr[7]) {
						temp = this.arr[6];
						this.arr[6] = this.arr[7];
						this.arr[7] = temp;
					}					
					this.comp1 = null;
					this.comp2 = null;
					this.split = 9;
					break;
				case 18:
					this.split = null;
					this.merge1 = 8;
					this.merge2 = 9; 
					break;
				case 19:
					this.merge1 = null;
					this.merge2 = null;
					this.comp1 = 8;
					this.comp2 = 9;
					break;
				case 20:
					if (this.arr[8] > this.arr[9]) {
						temp = this.arr[8];
						this.arr[8] = this.arr[9];
						this.arr[9] = temp;
					}
					this.comp1 = null;
					this.comp2 = null;
					this.merge1 = 0;
					this.merge2 = 3;
					break;
				case 21: 
					this.comp1 = 0;
					this.comp2 = 2;
					this.workArrIdx = this.comp1;
					break;
				case 22: 
					if (this.comp1 >= this.comp2) {
						for (let i = this.comp2; i < this.merge2; ++i) {
							this.workArr[this.workArrIdx++] = this.arr[i];
						}
					}
					else if (this.comp2 > this.merge2) {
						for (let i = this.comp1; i < Math.ceil((this.merge1 + this.merge2) / 2); ++i) {
							this.workArr[this.workArrIdx++] = this.arr[i];
						}
					}
					if (this.arr[this.comp1] <= this.arr[this.comp2]) {
						this.workArr[this.workArrIdx++] = this.arr[this.comp1++];
						if (this.arr[this.comp1-1] == this.arr[this.comp2]) {
							this.workArr[this.workArrIdx] = this.arr[this.comp2];
							++this.comp2;
						}
					}
					else {
						this.workArr[this.comp1] = this.arr[this.comp2];
						++this.comp2;
					}
					if (this.workArrIdx == this.merge2)
						for(let i = this.merge1; i <= this.workArrIdx; ++i)
							this.arr[i] = this.workArr[i];
					else 
						--this.stepCount;
					break;
				case 23:

			}
		}
		if (this.stepCount != null)
			++this.stepCount;
		console.log(this.split, this.merge1, this.merge2, this.comp1, this.comp2);
	*/
	}
}
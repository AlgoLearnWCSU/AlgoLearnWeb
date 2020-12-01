import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-quick-sort',
	templateUrl: './quick-sort.component.html',
	styleUrls: ['./quick-sort.component.scss']
})
export class QuickSortComponent implements OnInit {
	arr: number[];
	i = 0;
	j = 0;

	quickSortJSCode = `function swap(items, leftIndex, rightIndex){
		var temp = items[leftIndex];
		items[leftIndex] = items[rightIndex];
		items[rightIndex] = temp;
	}
	function partition(items, left, right) {
		var pivot   = items[Math.floor((right + left) / 2)], //middle element
			i       = left, //left pointer
			j       = right; //right pointer
		while (i <= j) {
			while (items[i] < pivot) {
				i++;
			}
			while (items[j] > pivot) {
				j--;
			}
			if (i <= j) {
				swap(items, i, j); //sawpping two elements
				i++;
				j--;
			}
		}
		return i;
	}
	
	function quickSort(items, left, right) {
		var index;
		if (items.length > 1) {
			index = partition(items, left, right); //index returned from partition
			if (left < index - 1) { //more elements on the left side of the pivot
				quickSort(items, left, index - 1);
			}
			if (index < right) { //more elements on the right side of the pivot
				quickSort(items, index, right);
			}
		}
		return items;
	}
	// first call to quick sort
	var sortedArray = quickSort(items, 0, items.length - 1);
	console.log(sortedArray);
	`

	quickSortPsuedocode = `procedure bubbleSort(A : list of sortable items)
	n := length(A)
	repeat
		swapped := false
		for i := 1 to n-1 inclusive do
			/* if this pair is out of order */
			if A[i-1] > A[i] then
				/* swap them and remember something changed */
				swap(A[i-1], A[i])
				swapped := true
			end if
		end for
	until not swapped
end procedure
`
	constructor() { }
	ngOnInit(): void {

	}

}

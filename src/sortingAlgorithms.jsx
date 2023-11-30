// Helper function for swapping elements in an array
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  
  export const selectionSort = (arr) => {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      swaps++;
      swap(arr, i, minIndex);
    }
  
    return {
      sortedArray: arr,
      comparisons,
      swaps,
      algorithm: 'Selection Sort',
      explanation: 'Selection Sort is a simple sorting algorithm that repeatedly finds the minimum element from the unsorted part of the array and puts it at the beginning. The algorithm maintains a sorted and an unsorted region of the array.',
      bestCaseTime: 'O(n^2)',
      worstCaseTime: 'O(n^2)',
    };
  };
  
  export const bubbleSort = (arr) => {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (arr[j] > arr[j + 1]) {
          swaps++;
          swap(arr, j, j + 1);
        }
      }
    }
  
    return {
      sortedArray: arr,
      comparisons,
      swaps,
      algorithm: 'Bubble Sort',
      explanation: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      bestCaseTime: 'O(n)',
      worstCaseTime: 'O(n^2)',
    };
  };
  
  export const insertionSort = (arr) => {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
  
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        comparisons++;
        swaps++;
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  
    return {
      sortedArray: arr,
      comparisons,
      swaps,
      algorithm: 'Insertion Sort',
      explanation: 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
      bestCaseTime: 'O(n)',
      worstCaseTime: 'O(n^2)',
    };
  };
  
  export const mergeSort = (arr) => {
    const merge = (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
  
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };
  
    const splitAndMerge = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
  
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
  
      return merge(splitAndMerge(left), splitAndMerge(right));
    };
  
    const sortedArray = splitAndMerge(arr);
    const comparisons = 0; // Assuming merge sort doesn't track comparisons
    const swaps = 0; // Assuming merge sort doesn't track swaps
  
    return {
      sortedArray,
      comparisons,
      swaps,
      algorithm: 'Merge Sort',
      explanation: 'Merge Sort is an efficient, stable, and comparison-based sorting algorithm. Most implementations produce a stable sort, meaning that the implementation preserves the input order of equal elements in the sorted output.',
      bestCaseTime: 'O(n log n)',
      worstCaseTime: 'O(n log n)',
    };
  };
  
  export const quickSort = (arr) => {
    const internalQuickSort = (arr, comparisons, swaps) => {
      if (arr.length <= 1) {
        return { sortedArray: arr, comparisons, swaps };
      }
  
      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];
  
      for (let i = 0; i < arr.length - 1; i++) {
        comparisons++;
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
          swaps++;
        }
      }
  
      const { sortedArray: leftSorted, comparisons: leftComparisons, swaps: leftSwaps } = internalQuickSort(left, comparisons, swaps);
      const { sortedArray: rightSorted, comparisons: rightComparisons, swaps: rightSwaps } = internalQuickSort(right, leftComparisons, leftSwaps);
  
      const sortedArray = [...leftSorted, pivot, ...rightSorted];
      return {
        sortedArray,
        comparisons: rightComparisons,
        swaps: rightSwaps,
        algorithm: 'Quick Sort',
        explanation: 'Quick Sort is an efficient, in-place, and comparison-based sorting algorithm. It works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
        bestCaseTime: 'O(n log n)',
        worstCaseTime: 'O(n^2)',
      };
    };
  
    return internalQuickSort(arr, 0, 0);
  };
  export const heapSort = (arr) => {
    const swap = (arr, i, j) => {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    };
  
    const heapify = (arr, n, i, comparisons, swaps) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n) {
        comparisons++;
        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }
  
      if (right < n) {
        comparisons++;
        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }
  
      if (largest !== i) {
        swaps++;
        swap(arr, i, largest);
        heapify(arr, n, largest, comparisons, swaps);
      }
  
      return { comparisons, swaps };
    };
  
    const buildMaxHeap = (arr, comparisons, swaps) => {
      const n = arr.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        const { comparisons: newComparisons, swaps: newSwaps } = heapify(arr, n, i, comparisons, swaps);
        comparisons = newComparisons;
        swaps = newSwaps;
      }
      return { comparisons, swaps };
    };
  
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    let { comparisons: heapifyComparisons, swaps: heapifySwaps } = buildMaxHeap(arr, comparisons, swaps);
  
    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i);
      const { comparisons: newComparisons, swaps: newSwaps } = heapify(arr, i, 0, heapifyComparisons, heapifySwaps);
      heapifyComparisons = newComparisons;
      heapifySwaps = newSwaps;
    }
  
    return {
      sortedArray: arr,
      comparisons: heapifyComparisons,
      swaps: heapifySwaps,
      algorithm: 'Heap Sort',
      explanation: 'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It is a much more efficient algorithm than selection sort and bubble sort.',
      bestCaseTime: 'O(n log n)',
      worstCaseTime: 'O(n log n)',
    };
  };
  
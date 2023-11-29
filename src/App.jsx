import React, { useState } from 'react';
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from './sortingAlgorithms';

const App = () => {
  const [inputArray, setInputArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('selectionSort');
  const [sortedArray, setSortedArray] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [algorithmUsed, setAlgorithmUsed] = useState('');
  const [explanation, setExplanation] = useState('');
  const [bestCaseTime, setBestCaseTime] = useState('');
  const [worstCaseTime, setWorstCaseTime] = useState('');

  const handleArrayInputChange = (e) => {
    const input = e.target.value;
    const newArray = input.split(',').map((num) => parseInt(num, 10));
    setInputArray(newArray);
  };

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleSortClick = () => {
    const startTime = performance.now();

    let result;
    switch (selectedAlgorithm) {
      case 'selectionSort':
        result = selectionSort([...inputArray]);
        break;
      case 'bubbleSort':
        result = bubbleSort([...inputArray]);
        break;
      case 'insertionSort':
        result = insertionSort([...inputArray]);
        break;
      case 'mergeSort':
        result = mergeSort([...inputArray]);
        break;
      case 'quickSort':
        result = quickSort([...inputArray]);
        break;
      case 'heapSort':
        result = heapSort([...inputArray]);
  
        break;
      default:
        result = { sortedArray: [...inputArray], algorithm: 'No Sorting' };
    }

    const endTime = performance.now();
    setSortedArray(result.sortedArray);
    setTimeTaken(endTime - startTime);
    setComparisons(result.comparisons || 0);
    setSwaps(result.swaps || 0);
    setAlgorithmUsed(result.algorithm || '');
    setExplanation(result.explanation);
    setBestCaseTime(result.bestCaseTime);
    setWorstCaseTime(result.worstCaseTime);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-8">Types of Sorting</h1>

        {/* Step 1: Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Step 1: Enter Numbers</label>
          <input
            type="text"
            className="border p-3 w-full"
            placeholder="Enter numbers separated by commas"
            onChange={handleArrayInputChange}
          />
        </div>

        {/* Step 2: Algorithm Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Step 2: Select Sorting Algorithm</label>
          <select
            className="border p-3 w-full"
            value={selectedAlgorithm}
            onChange={handleAlgorithmChange}
          >
            <option value="selectionSort">Selection Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="heapSort">Heap Sort</option>
          </select>
        </div>

        {/* Step 3: Sorting Result */}
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          onClick={handleSortClick}
        >
        Sort
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Sorted Array:</h2>
          <p className="text-gray-800">{sortedArray.join(', ')}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Time Taken:</h2>
          <p className="text-gray-800">{timeTaken.toFixed(10)} milliseconds</p>
        </div>

        {algorithmUsed && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Sorting Algorithm Used:</h2>
            <p className="text-gray-800">{algorithmUsed}</p>
            <h2 className="text-xl font-semibold mt-4">Comparisons: </h2>
            <p className="text-gray-800">{comparisons}</p>
            <h2 className="text-xl font-semibold mt-4">Swaps: </h2>
            <p className="text-gray-800">{swaps}</p>
            <h2 className="text-xl font-semibold mt-4">Explanation:</h2>
            <p className="text-gray-800">{explanation}</p>
            <h2 className="text-xl font-semibold mt-4">Best Case Time Complexity:</h2>
            <p className="text-gray-800">{bestCaseTime}</p>
            <h2 className="text-xl font-semibold mt-4">Worst Case Time Complexity:</h2>
            <p className="text-gray-800">{worstCaseTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

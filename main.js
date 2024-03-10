function addToZero(arr) {
    const pre = new Set();
    for (const num of arr) {
        if (pre.has(-num)) {
            return true;
        }
        pre.add(num);
    }
    return false;
}

// Time complexity: O(n) -  iterate through the array once
// Space complexity: O(n) - create a set to store pre numbers

function hasUniqueChars(word) {
    const set = new Set();
    for (const ch of word) {
        if (set.has(ch)) {
            return false;
        }
        set.add(ch);
    }
    return true;
}

// Time complexity: O(n) -  iterate through each character of the string 
// Space complexity: O(n) - create a set to store all unique characters of the string

function isPangram(sentence) {
    let set = new Set();
    const toLowerCaseStr = sentence.toLowerCase();
    for (let ch of toLowerCaseStr) {
        if (ch >= 'a' && ch <= 'z') set.add(ch);
    }
    return set.size === 26;
}


// Time complexity: O(n) - where n is the length of the sentence
// Space complexity: O() - we only use a fixed amount of extra space

function findLongestWord(words) {
    let result = 0;
    for (const word of words) {
        result = Math.max(result, word.length);
    }
    return result;
}

// Time complexity: O(n) - we iterate through each word once
// Space complexity: O(1) - only keep track of one variable, result

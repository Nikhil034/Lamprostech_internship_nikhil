let word = "racecar";
let letter = [], i;
let rword = "";

for (i = 0; i < word.length; i++) {
    letter.push(word[i]);
}

for (i = 0; i < word.length; i++) {
    rword += letter.pop();
}


if (rword == word) {
    console.log("String is palindrome!");
}
else {
    console.log("String is not palindrome");
}
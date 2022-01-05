//Variables
var special 
var numbers 
var lowerCase 
var upperCase 

//Constants 
const SPECIAL_CHARACTERS = '!@#$%^&*();:.,<>';
const NUMERICAL_CHARACTERS = '0123456789';
const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// GeneratePassword Function - Used to give a prompt window to initate the generate password sequence
function generatePassword() {
  let allPossibleCharacters = "";
  let PasswordLength = prompt("How many characters would you like your password to contain?");
  if (!PasswordLength) {
    return
  }

// Making sure the user is advised the length of the password must be between 8 and 128 characters
  if (PasswordLength < 8 || PasswordLength > 128) {
    return alert("Please try again & select a value between 8 and 128")
  }

// Once user has chosen a value between 8-128, they can select further acceptance critera

// If user wants Special Characters
  special = confirm("Please click on OK if you would like to use special characters in your password, please click cancel if you do not want special characters in your password")
  if (special) {
    allPossibleCharacters = allPossibleCharacters.concat(SPECIAL_CHARACTERS)
  }

// If user wants Numbers
  numbers = confirm("Please click on OK if you would like to use numbers in your password, please click cancel if you do not want numbers in your password")
  if (numbers) {
    allPossibleCharacters = allPossibleCharacters.concat(NUMERICAL_CHARACTERS)
  }

// If user wants Lowercase Characters
  lowerCase = confirm("Please click on OK if you would like to use lowercase characters in your password, please click cancel if you do not want lowercase characters in your password")
  if (lowerCase) {
    allPossibleCharacters = allPossibleCharacters.concat(LOWERCASE_CHARACTERS)
  }

// If user wants Uppercase Characters
  upperCase = confirm("Please click on OK if you would like to use uppercase characters in your password, please click cancel if you do not want uppercase characters in your password")
  if (upperCase) {
    allPossibleCharacters = allPossibleCharacters.concat(UPPERCASE_CHARACTERS)
  }

// Making sure user selected at least one character
  if (special === false && numbers === false && lowerCase === false && upperCase === false) {
    return alert("Please try again, you must have at least one character type in your password")
  }

// Once user has selected the characters they want to use, we place those values in a string and it will loop until the password is valid
  var notValid = true;
  var validPassword = "";
  while (notValid) {
    let pass = generatePossible(PasswordLength, allPossibleCharacters);
    let valid = checkPasswordValid(pass);
    if (valid) {
      notValid = false;
      validPassword = pass;
    }
  }
  return validPassword;
}

// Function to loop a random selection of characters based on the length chose by the user
function generatePossible(userLength, concatString) {
  var possPassword = "";
  for (var n = 0; n < userLength; n++) {
    possPassword += concatString.charAt(Math.floor(Math.random() * concatString.length));
  }
  return possPassword;
}

// Check to make sure password is valid and contains users selected characters
function checkPasswordValid(passToCheck) {
  if (special) {
    let = commonChar(SPECIAL_CHARACTERS, passToCheck);
  }
  if (numbers) {
    let = commonChar(NUMERICAL_CHARACTERS, passToCheck);
  }
  if (lowerCase) {
    let = commonChar(LOWERCASE_CHARACTERS, passToCheck);
  }
  if (upperCase) {
    let = commonChar(UPPERCASE_CHARACTERS, passToCheck);
  }
  return true;
}

// Check to see common characters
function commonChar(charSetString, passwordTest) {
  for (let i = 0; i < passwordTest.length; i++) {
    if (charSetString.includes(passwordTest[i])) {
      return true;
    }
  }
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
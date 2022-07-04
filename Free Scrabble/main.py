"""
A one-try, one-player Scrabble game
"""

from random import randint


words = []

with open("words.txt") as file:  # open words.txt
    for word in file:
        words.append(word.strip().upper())  # append all words to an array

letters = [chr(i) for i in range(65, 91)]  # list of uppercase letters (A-Z)
points = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10]  # list of Scrabble letter values
letters_points = {letters: points for letters, points in zip(letters, points)} # dictionary of letters and points

inventory = []

score = 0

for i in range(7):  # pick 7 letters
    letter = letters[randint(0, len(letters) - 1)]  # pick a random letter from letters
    inventory.append(letter)  # add letter to inventory

print("Possible letters to use:", inventory)

word = input("Enter word: ").strip().upper()

if word in words:  # if the user creates a valid word
    for char in word:
        if char not in inventory:  # if the user enters an invalid letter
            print("Please only use the letters in your inventory")
            break
        else:
            inventory.remove(char)  # ensure the user only uses each occurrence of a letter once
            score += letters_points[char]
    else:  # if all letters are valid
        print("Good game! Your score is", score, ":D")
else:
    print("Remember to make a valid word!")

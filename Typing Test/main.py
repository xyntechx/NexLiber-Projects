import time


def generate_words(file_name, number_of_words):
    with open(file_name) as file:
        word_set = set(file.read().split()) # random order of elements every time generate_words() is called
        words_used = list(word_set)[0: number_of_words] # fixed indices still ensure random words
        sentence = " ".join(words_used)
        return sentence


def evaluate_speed(words, time_taken):
    """
    Calculates the typing speed in characters per minute (cpm)
    Returns the typing speed in cpm
    """
    number_of_chars = len(words)
    time_taken_mins = time_taken / 60

    speed_magnitude = number_of_chars / time_taken_mins
    speed = "{:.1f}".format(speed_magnitude) + " cpm" # speed in cpm (to 1dp)

    return speed


def evaluate_accuracy(user_words, actual_words):
    """
    Calculates the accuracy of typing per word
    Returns the accuracy in %
    """
    actual_list = actual_words.split()
    user_list = user_words.split()

    score = 0 # +1 for correct word, +0 for incorrectly spelled word
    total = len(actual_list)

    length = 0

    if len(user_list) <= len(actual_list):
        length = len(user_list)
    else:
        length = len(actual_list)

    for i in range(length):
        user_word = user_list[i]
        actual_word = actual_list[i]
        if user_word == actual_word:
            score += 1
    
    accuracy = "{:.1f}".format((score / total) * 100) + "%" # accuracy in % (to 1dp)

    return accuracy


if __name__ == "__main__":
    print("I hope you've read the README file ;)")
    print()
    
    number_of_words = int(input("How many words do you want to type (e.g. 50)? "))
    if number_of_words <= 0:
        raise Exception("Please input a positive integer!")

    print()
    words = generate_words("words.txt", number_of_words) # words to be typed
    print("TYPE THE FOLLOWING WORDS...")
    print(words)
    print()

    prompt = input("Press Enter to start...") # prevent timer from starting before user is ready
    print()

    start = time.time()
    user_words = input()
    end = time.time()
    time_taken = end - start # time taken (in s) to type the words

    speed = evaluate_speed(user_words, time_taken)
    accuracy = evaluate_accuracy(user_words, words)

    print()
    print("Speed:", speed)
    print("Accuracy:", accuracy)

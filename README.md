
# LeetCode Recommender

## Overview

The LeetCode Recommender is a web-based application that helps users practice LeetCode problems using spaced repetition and personalized difficulty preferences. It tracks user progress, adapts to solving times, and recommends questions based on user-defined difficulty ratios.

## Features

- Spaced repetition algorithm for optimal learning
- Dynamic difficulty adjustment based on solving time
- User-defined difficulty preferences
- Progress tracking and statistics
- LeetCode problem recommendations


## Usage

1. Open the `index.html` file in a web browser.
2. The application will display a LeetCode question.
3. Solve the question on LeetCode (use the provided link).
4. Enter the time taken to solve the problem in minutes.
5. Click "Next Question" to record your progress and get a new question.
6. Adjust the difficulty preferences using the sliders as desired.

## File Structure

### index.html

The main HTML file that structures the web application.

Key elements:
- Question display area
- Solving time input
- Next question button
- User statistics display
- Difficulty preference sliders

### styles.css

Contains all the CSS styles for the application.

Key styles:
- Layout and spacing
- Colors and typography
- Input and button styles

### script.js

The JavaScript file that handles the application logic.

Key functions:
- `showQuestion()`: Displays the current question
- `nextQuestion()`: Processes the solved question and selects the next one
- `updateSpacedRepetition()`: Applies the spaced repetition algorithm
- `chooseNextQuestion()`: Selects the next question based on preferences
- `updateStats()`: Updates the user's statistics display

### questions.json

A JSON file containing the pool of LeetCode questions.

Example structure:
```json
[
  {
    "title": "Two Sum",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/two-sum/",
    "lastReviewedAt": "2023-08-15T00:00:00.000Z",
    "interval": 1,
    "easinessFactor": 2.5,
    "repetitions": 0
  },
  ...
]
```

## Customization

To add more questions, edit the `questions.json` file, following the existing structure for each question. Ypu can also copy paste new questions from the questions repo.json and feel free to add more to the the questions repo.

## Algorithm Details

### Difficulty Adjustment
- ≤ 5 minutes: Easy
- 6-15 minutes: Medium
- > 15 minutes: Hard

### Spaced Repetition
The algorithm adjusts the review interval and ease factor based on solving time:
- Easy questions increase the ease factor
- Hard questions decrease the ease factor
- The interval between reviews increases with successful repetitions

### Question Selection
Questions are selected based on:
1. User-defined difficulty preferences
2. Time since last review (must be ≥ current interval)
3. Random selection among eligible questions

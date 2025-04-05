"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Share2Icon, RefreshCwIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

// Mock database of geography questions
const questionsDB = [
  {
    id: 1,
    clue: "This city has an ancient amphitheater that once hosted gladiator battles.",
    answer: "rome",
  },
  {
    id: 2,
    clue: "This city is known for its iconic Eiffel Tower.",
    answer: "paris",
  },
  {
    id: 3,
    clue: "This city is home to the famous Sydney Opera House.",
    answer: "sydney",
  },
  {
    id: 4,
    clue: "This city has a famous wall that once divided it into East and West.",
    answer: "berlin",
  },
  {
    id: 5,
    clue: "This city is known as the 'Big Apple'.",
    answer: "new york",
  },
  {
    id: 6,
    clue: "This city is famous for its canals and gondolas.",
    answer: "venice",
  },
  {
    id: 7,
    clue: "This city is home to the Acropolis and the Parthenon.",
    answer: "athens",
  },
  {
    id: 8,
    clue: "This city is known for the Christ the Redeemer statue.",
    answer: "rio de janeiro",
  },
  {
    id: 9,
    clue: "This city is famous for its red double-decker buses and Big Ben.",
    answer: "london",
  },
  {
    id: 10,
    clue: "This city is home to the Forbidden City and was once the imperial capital of China.",
    answer: "beijing",
  },
]


export default function QuizGame() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Get a random question from the database
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionsDB.length)
    return questionsDB[randomIndex]
  }

  // Start a new game
  const startGame = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCurrentQuestion(getRandomQuestion() as unknown as any)
    setUserAnswer("")
    setFeedback(null)
    setIsCorrect(null)
  }

  // Restart the game and reset score
  const restartGame = () => {
    setScore({ correct: 0, total: 0 })
    startGame()
  }

  // Check the user's answer
  const checkAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase()
    const normalizedCorrectAnswer = currentQuestion.answer.toLowerCase()

    const correct = normalizedUserAnswer === normalizedCorrectAnswer
    setIsCorrect(correct)

    if (correct) {
      setFeedback("Correct! Well done!")
      setScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }))
      // Move to next question after a delay
      setTimeout(() => {
        setCurrentQuestion(getRandomQuestion())
        setUserAnswer("")
        setFeedback(null)
        setIsCorrect(null)
      }, 1500)
    } else {
      setFeedback(`Sorry, the correct answer is ${currentQuestion.answer}.`)
      setScore((prev) => ({ ...prev, total: prev.total + 1 }))
      // Clear feedback after a delay
      setTimeout(() => {
        setUserAnswer("")
        setFeedback(null)
        setIsCorrect(null)
        setCurrentQuestion(getRandomQuestion())
      }, 2000)
    }
  }

  // Initialize the game
  useEffect(() => {
    startGame()
  }, [])

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    checkAnswer()
  }

  if (!currentQuestion) {
    return <div className="p-8 text-center">Loading question...</div>
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 text-orange-500">Globetrotter Challenge</h3>
        <p className="text-lg mb-6">
          <span className="font-medium">Clue:</span> {currentQuestion.clue}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium mb-1">
              Your guess
            </label>
            <Input
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={`border-2 ${
                isCorrect === null
                  ? "border-gray-300 dark:border-gray-700"
                  : isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-red-500 bg-red-50 dark:bg-red-900/20"
              }`}
              placeholder="Enter city name"
              disabled={feedback !== null}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={!userAnswer.trim() || feedback !== null}
          >
            Submit
          </Button>
        </form>

        {feedback && (
          <div
            className={`mt-4 p-3 rounded-md ${
              isCorrect
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t pt-4 dark:border-gray-700">
        <Button
          onClick={restartGame}
          className="text-orange-500 border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800"
        >
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Restart Game
        </Button>

        <Button
          className="text-orange-500 border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800"
        >
          <Share2Icon className="h-4 w-4 mr-2" />
          Invite a Friend
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
      </div>
    </div>
  )
}
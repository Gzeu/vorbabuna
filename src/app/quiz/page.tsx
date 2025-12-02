'use client';
import { useState, useEffect } from 'react';
import FolkButton from '@/components/ui/FolkButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Check, X, Trophy, RefreshCw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  text: string;
  correctMeaning: string;
  options: string[];
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      // Fetch 5 random proverbs for quiz
      const promises = Array(5).fill(null).map(() => fetch('/api/proverb'));
      const responses = await Promise.all(promises);
      const proverbs = await Promise.all(responses.map(r => r.json()));

      // Create quiz questions
      const quizQuestions: QuizQuestion[] = proverbs.map((p, idx) => {
        const otherMeanings = proverbs
          .filter((_, i) => i !== idx)
          .map(p => p.meaning)
          .slice(0, 3);
        
        const options = [p.meaning, ...otherMeanings].sort(() => Math.random() - 0.5);

        return {
          id: p.id,
          text: p.text,
          correctMeaning: p.meaning,
          options,
        };
      });

      setQuestions(quizQuestions);
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correctMeaning) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    loadQuiz();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <Trophy className="w-24 h-24 text-folk-gold mx-auto mb-6" />
            <h1 className="text-4xl font-display font-bold text-folk-brown mb-4">
              Quiz Finalizat!
            </h1>
            <div className="text-6xl font-bold text-folk-red mb-6">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Ai obținut {percentage.toFixed(0)}% punctaj!
            </p>
            <FolkButton onClick={resetQuiz} size="lg">
              <RefreshCw size={20} className="inline mr-2" />
              Încearcă Din Nou
            </FolkButton>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-display font-bold text-folk-gradient mb-4">
            Quiz Proverbe
          </h1>
          <div className="flex justify-center gap-2 mb-4">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-12 h-2 rounded-full ${
                  idx === currentQuestion
                    ? 'bg-folk-red'
                    : idx < currentQuestion
                    ? 'bg-folk-gold'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">
            Întrebarea {currentQuestion + 1} din {questions.length} | Scor: {score}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <blockquote className="text-3xl font-serif text-folk-brown text-center mb-8 leading-relaxed">
            &quot;{question.text}&quot;
          </blockquote>

          <p className="text-center text-gray-600 mb-6 text-lg">
            Care este înțelesul acestui proverb?
          </p>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctMeaning;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-6 rounded-xl text-left transition-all border-2 ${
                    showCorrect
                      ? 'bg-green-50 border-green-500 text-green-900'
                      : showWrong
                      ? 'bg-red-50 border-red-500 text-red-900'
                      : 'bg-white border-folk-red/20 hover:border-folk-red hover:shadow-folk'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showCorrect && <Check className="text-green-600" size={24} />}
                    {showWrong && <X className="text-red-600" size={24} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

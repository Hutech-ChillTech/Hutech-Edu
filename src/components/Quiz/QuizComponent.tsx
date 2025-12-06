import React, { useState, useEffect } from "react";
import styles from "./QuizComponent.module.css";
import { quizService } from "../../service/quiz.service";

interface QuizQuestion {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points?: number;
}

interface QuizComponentProps {
  chapterId: string;
  lessonName: string;
  onQuizComplete?: (passed: boolean, score: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  chapterId,
  onQuizComplete,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState<string>("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const quizzes = await quizService.getQuizzesByChapter(chapterId);

        if (!quizzes || quizzes.length === 0) {
          setQuestions([]);
          setLoading(false);
          return;
        }

        const quiz = quizzes[0];
        setQuizTitle(quiz.title || "Bài trắc nghiệm");

        const questionsData = await quizService.getQuestionsByQuiz(
          quiz.chapterQuizId
        );

        if (!questionsData || questionsData.length === 0) {
          setQuestions([]);
          setLoading(false);
          return;
        }

        const transformedQuestions: QuizQuestion[] = await Promise.all(
          questionsData.map(async (q: any) => {
            const options = await quizService.getOptionsByQuestion(
              q.quizQuestionId
            );
            const correctIndex = options.findIndex((opt: any) => opt.isCorrect);

            return {
              questionId: q.quizQuestionId,
              questionText: q.questionText,
              options: options.map((opt: any) => opt.optionText),
              correctAnswer: correctIndex,
              points: q.points || 1,
            };
          })
        );

        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchQuizData();
    }
  }, [chapterId]);

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);

    // Trigger callback khi quiz hoàn thành
    if (onQuizComplete) {
      const { correct, total } = calculateScore();
      const percentage = Math.round((correct / total) * 100);
      const passed = percentage >= 70;
      onQuizComplete(passed, percentage);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  if (loading) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizContent}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải câu hỏi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizContent}>
          <div className={styles.noQuiz}>
            <div className={styles.noQuizIcon}>📝</div>
            <h3>Chưa có bài trắc nghiệm</h3>
            <p>Chương này chưa có câu hỏi trắc nghiệm.</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { correct, total } = calculateScore();
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 70;

    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizContent}>
          <div className={styles.resultsContainer}>
            <div
              className={`${styles.resultIcon} ${
                passed ? styles.passed : styles.failed
              }`}
            >
              {passed ? "🎉" : "📚"}
            </div>
            <h2 className={styles.resultTitle}>
              {passed ? "Chúc mừng!" : "Cần cố gắng thêm!"}
            </h2>
            <div className={styles.scoreDisplay}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreNumber}>{percentage}%</span>
              </div>
              <p className={styles.scoreText}>
                Bạn trả lời đúng {correct}/{total} câu
              </p>
            </div>

            <div className={styles.reviewSection}>
              <h3>Xem lại đáp án</h3>
              {questions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={q.questionId} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.questionNumber}>
                        Câu {index + 1}
                      </span>
                      <span
                        className={`${styles.resultBadge} ${
                          isCorrect ? styles.correct : styles.incorrect
                        }`}
                      >
                        {isCorrect ? "✓ Đúng" : "✗ Sai"}
                      </span>
                    </div>
                    <p className={styles.reviewQuestion}>{q.questionText}</p>
                    <div className={styles.reviewAnswers}>
                      <p>
                        <strong>Đáp án của bạn:</strong>{" "}
                        {userAnswer !== undefined
                          ? q.options[userAnswer]
                          : "Chưa trả lời"}
                      </p>
                      {!isCorrect && (
                        <p className={styles.correctAnswerText}>
                          <strong>Đáp án đúng:</strong>{" "}
                          {q.options[q.correctAnswer]}
                        </p>
                      )}
                      {q.explanation && (
                        <p className={styles.explanation}>
                          <strong>Giải thích:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button className={styles.retryButton} onClick={handleRetry}>
              🔄 Làm lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizContent}>
        <div className={styles.quizHeader}>
          <h2 className={styles.quizTitle}>📝 {quizTitle}</h2>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={styles.questionCounter}>
            Câu {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        <div className={styles.questionContainer}>
          <h3 className={styles.questionText}>{question.questionText}</h3>
          <div className={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              return (
                <div
                  key={index}
                  className={`${styles.option} ${
                    isSelected ? styles.selected : ""
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <div className={styles.optionRadio}>
                    {isSelected && (
                      <div className={styles.optionRadioInner}></div>
                    )}
                  </div>
                  <span className={styles.optionLabel}>
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className={styles.optionText}>{option}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.navigationButtons}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Câu trước
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              className={`${styles.navButton} ${styles.submitButton}`}
              onClick={handleSubmit}
              disabled={
                Object.keys(selectedAnswers).length !== questions.length
              }
            >
              Nộp bài
            </button>
          ) : (
            <button className={styles.navButton} onClick={handleNext}>
              Câu tiếp →
            </button>
          )}
        </div>

        <div className={styles.quizFooter}>
          <p>
            Đã trả lời: {Object.keys(selectedAnswers).length}/{questions.length}{" "}
            câu
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;

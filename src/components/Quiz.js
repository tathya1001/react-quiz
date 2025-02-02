import React, { useContext, useState } from 'react';
import DataContext from '../context/dataContext';

const Quiz = () => {
    const {
        question,
        quizStarted,
        checkAnswer,
        selectedAnswer,
        // correctAnswer,
        nextQuestion,
        marks
    } = useContext(DataContext);

    const [isDisabled, setIsDisabled] = useState(false);

    if (!quizStarted) return null;

    const corrAns = question.options.find(option => option.is_correct);

    const handleAnswerClick = (e, option) => {
        checkAnswer(e, option, question.options);
        setIsDisabled(true);
    };


    return (
        <section className='quiz-section'>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8 bg-blue-600">
                        <h2 className='fw-bold'>{question.description}</h2>

                        {/* Render question options */}
                        <div className="options">
                            {question.options && question.options.length > 0 ? (
                                question.options.map(option => (
                                    <button
                                        key={option.id}
                                        className={`btn w-100 my-2 py-2 px-3 rounded`}
                                        onClick={(e) => handleAnswerClick(e, option)}
                                        disabled={isDisabled}
                                    >
                                        {option.description}
                                    </button>
                                ))
                            ) : (
                                <p>No options available</p>
                            )}
                        </div>

                        {selectedAnswer && (
                            <div className='mt-3'>
                                <h3>
                                    {selectedAnswer.description === corrAns.description
                                        ? `Correct Answer!`
                                        : `Incorrect. Correct Answer is ${corrAns.description}`}
                                </h3>
                            </div>
                        )}

                        <button className='' onClick={() => { nextQuestion(); setIsDisabled(false); }}>
                            Next Question
                        </button>

                        {/* Show total marks */}
                        <div className='mt-3'>
                            <p>Your current score: {marks}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;

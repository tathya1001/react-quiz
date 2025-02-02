import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Start = () => {
    const { startQuiz, quizStarted, showResult } = useContext(DataContext);

    if (quizStarted) return null;
    if (showResult) return null;

    return (
        <section className='text-white text-center bg-dark vh-100 d-flex align-items-center justify-content-center'>
            <div className="container">
                <h1 className='fw-bold mb-4'>Basic React JS Quiz</h1>
                <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
            </div>
        </section>
    );
};

export default Start;

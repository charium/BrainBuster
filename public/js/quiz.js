document.getElementById('quiz-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = {};
  
    formData.forEach((value, key) => {
      data[key] = value;
    });
  console.log('data', data)
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      alert(`Your score is: ${result.correct} out of ${result.total}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  });
  
document.getElementById('quiz-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const response = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      try {
        const result = JSON.parse(responseText);
        alert(`Your score is: ${result.correct} out of ${result.total}`);

        // Reset the form after successful submission
        event.target.reset();

        // Redirect to the scores page
        // window.location.href = '/scores';
      } catch (e) {
        console.error('Error parsing JSON:', e);
        alert('There was an error processing your submission. Please try again.');
      }
    } else {
      const errorText = await response.text();
      console.error('Error submitting quiz:', errorText);
      alert('There was an error submitting your quiz. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting quiz:', error);
    alert('There was an error submitting your quiz. Please try again.');
  }
});

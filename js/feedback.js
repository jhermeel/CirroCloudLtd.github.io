const feedbackApp = {
  createFeedbackOnAPI: async function (feedbackData) {
    try {
      const response = await fetch(
        'https://server.cirrocloudug.com/api/v1/feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdFeedback = await response.json();
      return createdFeedback;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  },

  saveFeedback: async function (event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const feedbackData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };
    await this.createFeedbackOnAPI(feedbackData);
    window.location.href = 'contact.html';
  },

  addSubmitEventListenerToForm: function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', this.saveFeedback.bind(this));
  },
};
window.onload = function () {
  feedbackApp.addSubmitEventListenerToForm();
};

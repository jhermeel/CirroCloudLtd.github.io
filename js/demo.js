const demoApp = {
  createDemoOnAPI: async function (demoData) {
    try {
      const response = await fetch(
        'https://server.cirrocloudug.com/api/v1/demos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(demoData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdDemo = await response.json();
      return createdDemo;
    } catch (error) {
      console.error('Error creating demo:', error);
      throw error;
    }
  },

  saveDemo: async function (event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const companyInput = document.getElementById('company');
    const regionInput = document.getElementById('region');
    const serviceInput = document.getElementById('service');
    const hearAboutInput = document.getElementById('hear-about');

    const demoData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      company: companyInput.value,
      region: regionInput.value,
      service: serviceInput.value,
      hearAbout: hearAboutInput.value,
    };
    await this.createDemoOnAPI(demoData);
    window.location.href = 'index.html';
  },

  addSubmitEventListenerToForm: function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', this.saveDemo.bind(this));
  },
};
window.onload = function () {
  demoApp.addSubmitEventListenerToForm();
};

const blogApp = {
  blogList: [],
  currentPage: 0,
  itemsPerPage: 4,

  fetchBlogList: async function () {
    try {
      const response = await fetch('http://localhost:5000/api/v1/blogs');
      if (response.ok) {
        const data = await response.json();
        this.blogList.push(...data.blogs);
        this.renderBlogList();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching blog list:', error);
    }
  },

  createBlogOnAPI: async function (blog) {
    try {
      const response = await fetch('http://localhost:5000/api/v1/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdBlog = await response.json();
      return createdBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  createBlogListItem: function (blog) {
    const blogItem = document.createElement('li');
    blogItem.classList.add('blog-item');
    const id = document.createElement('h6');
    id.textContent = blog._id;
    id.style.display = 'none';

    const img = document.createElement('img');
    img.src = blog.imageUrl;

    const blogDetails = document.createElement('div');
    blogDetails.classList.add('blog-details');

    const title = document.createElement('h2');
    const titleLink = document.createElement('a');

    titleLink.textContent = blog.title;
    title.appendChild(titleLink);

    const dateAndReadTime = document.createElement('small');
    dateAndReadTime.textContent = `${blog.date} - ${blog.readTime} min read`;

    blogDetails.appendChild(title);
    blogDetails.appendChild(id);
    blogDetails.appendChild(dateAndReadTime);

    blogItem.appendChild(img);
    blogItem.appendChild(blogDetails);

    return blogItem;
  },

  renderBlogList: function () {
    const blogListElement = document.querySelector('.blog-list');
    blogListElement.innerHTML = '';
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    for (let i = startIndex; i < endIndex && i < this.blogList.length; i++) {
      const blogItem = this.createBlogListItem(this.blogList[i]);
      blogListElement.appendChild(blogItem);
    }

    this.addClickEventListenersToBlogItems();
    this.updatePaginationButtons();
  },

  addClickEventListenersToBlogItems: function () {
    const blogItems = document.querySelectorAll('.blog-item');

    blogItems.forEach((item) => {
      item.addEventListener('click', () => {
        localStorage.removeItem('selectedBlog');

        const inputString = item.querySelector('small').innerText;

        const datePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
        const dateMatch = inputString.match(datePattern);
        const date = dateMatch ? dateMatch[0] : null;

        const readTimePattern = /\d+(?=\s*min)/;
        const readTimeMatch = inputString.match(readTimePattern);
        const readTime = readTimeMatch ? parseInt(readTimeMatch[0], 10) : null;
        const blogData = {
          id: item.querySelector('h6').innerText,
          title: item.querySelector('h2 a').innerText,
          date: date,
          readTime: readTime,
          image: item.querySelector('img').getAttribute('src'),
        };
        localStorage.setItem('selectedBlog', JSON.stringify(blogData));
        window.location.href = 'blog-details.html';
      });
    });
  },

  updatePaginationButtons: function () {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (this.currentPage === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if ((this.currentPage + 1) * this.itemsPerPage >= this.blogList.length) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  },

  initPaginationButtons: function () {
    document.querySelector('.prev-btn').addEventListener('click', () => {
      this.currentPage--;
      this.renderBlogList();
    });
    document.querySelector('.next-btn').addEventListener('click', () => {
      this.currentPage++;
      this.renderBlogList();
    });
  },

  displayBlogDetail: function () {
    const selectedBlog = JSON.parse(localStorage.getItem('selectedBlog'));

    if (selectedBlog) {
      const blogDetailTitle = document.querySelector('.blog-detail-title');
      const blogDetailDate = document.querySelector('.blog-detail-date');
      const blogDetailReadTime = document.querySelector(
        '.blog-detail-readTime'
      );
      const blogDetailContent = document.querySelector('.blog-detail-content');
      const blogDetailImage = document.querySelector('.blog-detail-image');

      blogDetailTitle.innerText = selectedBlog.title;
      blogDetailDate.innerText = selectedBlog.date;
      blogDetailReadTime.innerText = selectedBlog.readTime;
      // blogDetailContent.innerHTML = selectedBlog.content;
      blogDetailImage.setAttribute('src', selectedBlog.image);
    }

    const editButton = document.querySelector('.edit-btn');
    if (editButton) {
      editButton.addEventListener('click', () => {
        const blogData = JSON.parse(localStorage.getItem('selectedBlog'));
        localStorage.setItem('selectedBlog', JSON.stringify(blogData));
        window.location.href = 'blog-form.html';
      });
    }
  },

  loadBlogForm: function () {
    const existingBlogData = JSON.parse(localStorage.getItem('selectedBlog'));
    // Get the form header and submit button elements
    const formHeader = document.getElementById('form-header');
    const submitButton = document.getElementById('submit-button');
    if (existingBlogData) {
      // Set the form header and submit button text for editing a blog
      formHeader.textContent = 'Edit Blog';
      submitButton.textContent = 'Update Blog';
      this.populateForm(existingBlogData);
    } else {
      // Set the form header and submit button text for creating a new blog
      formHeader.textContent = 'Create Blog';
      submitButton.textContent = 'Save Blog';
    }
  },

  saveBlog: async function () {
    const idInput = document.getElementById('blog-id');
    const titleInput = document.getElementById('blog-title');
    const dateInput = document.getElementById('blog-date');
    const readTimeInput = document.getElementById('blog-readTime');
    const imageUrlInput = document.getElementById('blog-imageUrl');
    const contentInput = document.getElementById('blog-content');

    const blogData = {
      title: titleInput.value,
      date: dateInput.value,
      readTime: parseInt(readTimeInput.value, 10),
      imageUrl: imageUrlInput.value,
      content: contentInput.value, 
    };

    const existingBlogData = JSON.parse(localStorage.getItem('selectedBlog'));

    if (existingBlogData) {
      // Update an existing blog
      const blogId = existingBlogData.id;
      await this.updateBlog(blogId, blogData);
    } else {
      // Create a new blog
      await this.createBlogOnAPI(blogData);
    }

    window.location.href = 'blog.html';
  },

  populateForm: function (blogData) {
    const titleInput = document.querySelector('#blog-title');
    const dateInput = document.querySelector('#blog-date');
    const readTimeInput = document.querySelector('#blog-readTime');
    const imageInput = document.querySelector('#blog-imageUrl');
    const contentInput = document.querySelector('#blog-content');

    const datetimeString = blogData.date;

    const formatDate = (date) => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    };

    const dateObject = new Date(datetimeString);
    const formattedDate = formatDate(dateObject);

    titleInput.value = blogData.title || '';
    dateInput.value = formattedDate || '';
    readTimeInput.value = blogData.readTime || '';
    imageInput.value = blogData.image || '';
    contentInput.value = blogData.content || '';
  },

  updateBlog: async function (blogId, updatedData) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/blogs/${blogId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Blog updated successfully:', responseData);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
    window.location.href = 'blog.html';
  },

  initCreateBlogButton: function () {
    if (document.querySelector('.create-blog-btn')) {
      document
        .querySelector('.create-blog-btn')
        .addEventListener('click', () => {
          localStorage.removeItem('selectedBlog');
          window.location.href = 'blog-form.html';
        });
    }
  },
};

blogApp.initCreateBlogButton();
blogApp.initPaginationButtons();

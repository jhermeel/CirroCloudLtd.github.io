const blogList = [
  {
    id: 1,
    title: 'First Blog Post',
    date: '2023-03-19',
    readTime: 5,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 4,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 5,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 6,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 7,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 8,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 9,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    id: 10,
    title: 'Second Blog Post',
    date: '2023-03-18',
    readTime: 3,
    imageUrl: 'https://via.placeholder.com/100',
  },
];

let currentPage = 0;
const itemsPerPage = 4;

function createBlogListItem(blog) {
  const blogItem = document.createElement('li');
  blogItem.classList.add('blog-item');

  const img = document.createElement('img');
  img.src = blog.imageUrl;

  const blogDetails = document.createElement('div');
  blogDetails.classList.add('blog-details');

  const title = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = `blog-detail.html?id=${blog.id}`;
  titleLink.textContent = blog.title;
  title.appendChild(titleLink);
  title.textContent = blog.title;

  const dateAndReadTime = document.createElement('small');
  dateAndReadTime.textContent = `${blog.date} - ${blog.readTime} min read`;

  blogDetails.appendChild(title);
  blogDetails.appendChild(dateAndReadTime);

  blogItem.appendChild(img);
  blogItem.appendChild(blogDetails);

  return blogItem;
}

function renderBlogList() {
  const blogListElement = document.querySelector('.blog-list');
  blogListElement.innerHTML = '';

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < blogList.length; i++) {
    const blogItem = createBlogListItem(blogList[i]);
    blogListElement.appendChild(blogItem);
  }

  updatePaginationButtons();
}

function updatePaginationButtons() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (currentPage === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if ((currentPage + 1) * itemsPerPage >= blogList.length) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

document.querySelector('.prev-btn').addEventListener('click', () => {
  currentPage--;
  renderBlogList();
});

document.querySelector('.next-btn').addEventListener('click', () => {
  currentPage++;
  renderBlogList();
});

renderBlogList();

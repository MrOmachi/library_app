//Variable Declaration in jquery
let bookTitle = $('#bookTitle'),
  bookAuthor = $('#bookAuthor'),
  bookPages = $('#bookPages'),
  readStatus = $('#readStatus'),
  submitBtn = $('#submitBtn'),
  addBooksBtn = $('#addBooksBtn'),
  bookTitleError = $('#bookTitleError'),
  bookAuthorError = $('#bookAuthorError'),
  bookPagesError = $('#bookPagesError'),
  readStatusError = $('#readStatusError'),
  toggle = $('#toggle'),
  booksIndex,
  books = [];

addBooksBtn.on('click', function () {
  toggle.toggleClass('hideForm');
});
//Events in jquery
loadLibraryData();
submitBtn.on('click', function () {
  let newBook = {
    bookTitle: bookTitle.val(),
    bookAuthor: bookAuthor.val(),
    bookPages: bookPages.val(),
    readStatus: readStatus.val(),
  };

  if (booksIndex == null) {
    books.push(newBook);
  } else {
    books[booksIndex] = newBook;
    booksIndex = null;
    submitBtn.html('ADD BOOK');
  }

  clearLibrary();
  loadLibraryData();
});

$('#readStatus').on('change', function () {
  if ($(this).is(':checked')) {
    $(this).attr('value', 'true');
  } else {
    $(this).attr('value', 'false');
  }
});

$('#tbody').on('click', '.deleteBtn', function () {
  let deleteBook = confirm('Do you want to delete this book from the library?');

  if (deleteBook) {
    let deleteIndex = $(this).attr('indexData');

    books.splice(deleteIndex, 1);

    loadLibraryData();
  }
});

$('#tbody').on('click', '.editBtn', function () {
  booksIndex = $(this).attr('indexData');

  bookTitle.val(books[booksIndex]['bookTitle']);
  bookAuthor.val(books[booksIndex]['bookAuthor']);
  bookPages.val(books[booksIndex]['bookPages']);
  readStatus.val(books[booksIndex]['readStatus']);
  submitBtn.html('UPDATE LIBRARY');
});

function loadLibraryData() {
  let rows = '';
  for (let index = 0; index < books.length; index++) {
    rows += `<tr>
    <td> ${index + 1}</td>
    <td> ${books[index]['bookTitle']}</td>
    <td> ${books[index]['bookAuthor']}</td>
    <td> ${books[index]['bookPages']}</td>
    <td> ${books[index]['readStatus']}</td>
    <td> <a href='#' indexData="${index}" class="editBtn">Edit</a> | <a href='#' indexData="${index}" class="deleteBtn">Delete</a></td>  
    </tr>`;
  }
  $('#tbody').html(rows);
}

function clearLibrary() {
  bookTitle.val('');
  bookAuthor.val('');
  bookPages.val('');
  readStatus.val('');
}

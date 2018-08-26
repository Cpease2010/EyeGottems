document.addEventListener('DOMContentLoaded', function () {
    localStorage.getItem('books') ||  localStorage.setItem('books', JSON.stringify([]))
    var savedBooks = JSON.parse(localStorage.getItem('books'))
    var baseURL = 'https://www.googleapis.com/books/v1/volumes?q='
    var searchButton = document.querySelector('#searchButton');
    function doIt(response) {
        for (var i = 0; i < response.length; i++) {
            var responseList = document.querySelector("#responseList")
            let newBook = document.createElement('li')
            newBook.textContent = response[i];
            let newLine = document.createElement('BR')
            responseList.append(newBook)
            responseList.append(newLine)
        }
    }
    console.log(savedBooks)
    doIt(savedBooks)
    searchButton.addEventListener('click', function () {
        var bookSearchTerm = document.querySelector('#bookName').value;
        var cardTitle = ''
        axios.get(`${baseURL}${bookSearchTerm.replace(/\s/g, '+')}`).then(result => handleResponse(result.data))
        bookSearchTerm.split(' ').forEach(element => {cardTitle += element.toUpperCase() + ' '});
        document.querySelector('#topName').textContent = cardTitle
    })

    function handleResponse(response) {
        for (var i = 0; i < response.items.length; i++) {
            var item = response.items[i];
            var responseList = document.querySelector("#responseList")
            let newBook = document.createElement('li')
            newBook.textContent = item.volumeInfo.title;
            let newLine = document.createElement('BR')
            responseList.append(newBook)
            responseList.append(newLine)
        }
        var books = document.querySelectorAll('#responseList > li')
        books.forEach(element => {
            element.addEventListener('click', function () {
                console.log(element.textContent)
                savedBooks.push(element.textContent)
                localStorage.setItem('books', JSON.stringify(savedBooks))
            })
        });
    }
})
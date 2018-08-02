# MyReads Project

This project is a requirement for the Udacity Front-End developer Nanodegree program. The project app allows you to select and categorize books you have read, are currently reading, or want to read. 

## How to install

* Clone the project with HTTPS: [https://github.com/ahmedraedm/reactnd-project-myreads-starter.git]
* Install all project dependencies with `npm install`
* Start the development server with `npm start`

## Application functionality

The application consists of two pages:

* Main page
* Search page

### Main page

The main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

* Currently Reading
* Want to Read
* Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. The default value for the control is the current shelf the book is in.

The main page also has a link to a _SEARCH_ page, it allows you to find books to add to your library.

### Search page

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. The search page also has a link button that navigates you back to the main page.

When you navigate back to the main page from the search page, all of the selections you made on the search page are moved to your library.

### License

This project is a public work. Feel free to do what ever you want with it.
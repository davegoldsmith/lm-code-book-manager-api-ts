import e, { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json({ message: `Book with bookId '${bookId}' not found` });
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	try {
		const book = await bookService.saveBook(bookToBeSaved);
		res.status(201).json(book);
	} catch (error) {
		const bookIdToBeSaved = bookToBeSaved.bookId;
		const bookExists = await bookService.getBook(bookIdToBeSaved);
		let message = (error as Error).message;
		if (bookExists !== null ) {
			message = `Book with bookId '${bookToBeSaved.bookId}' already exists`;
		}
			res.status(400).json({ message });
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const updatedBook = await bookService.updateBook(bookId, bookUpdateData);
	console.log(updatedBook[0]);
	console.log(updatedBook.length);
	if (updatedBook[0] === 1) {
		res.status(204).json(`Book with bookId '${bookId}' successfully updated`);
	} else {
		res.status(404).json({ message: `Book with bookId '${bookId}' not found` });
	}
};

// User Story - Deleye Book By Id
export const deleteBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const deleted = await bookService.deleteBook(Number(bookId));
	if (deleted === 1) {
		res.json(`Book with bookId '${bookId}' successfully deleted`).status(200);
	} else {
		res.status(404).json({ message: `Book with bookId '${bookId}' not found` });
	}
};

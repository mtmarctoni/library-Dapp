"use client";
//import Image from "next/image";
import { useState, useEffect } from "react";
import { contractAddress, getContract } from '../../smart-contract.config.js';
//import { ethers } from "ethers";

//import components
//mport BookContainer from '../components/BookContainer';
//import Book from '../components/Book';

export default function Home() {
  const [connected, setConnected] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = useState<any[]>([]);
  const [newBook, setNewBook] = useState({ name: '', year: '', author: '', finished: false });

  useEffect(() => {
    if (connected) {
      fetchBooks();
    }
  }, [connected]);

  const connect = async () => {
    try {
      await getContract();
      setConnected(true);
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchBooks = async () => {
    try {
      const contract = await getContract();
      const unfinishedBooks = await contract.getUnfinishedBook();
      const finishedBooks = await contract.getFinishedBook();
      setBooks([...unfinishedBooks, ...finishedBooks]);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contract = await getContract();
      await contract.addBook(newBook.name, parseInt(newBook.year), newBook.author, newBook.finished);
      setNewBook({ name: '', year: '', author: '', finished: false });
      await fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const toggleFinished = async (index: number) => {
    try {
      const contract = await getContract();
      await contract.setFinished(index, !books[index].finished);
      await fetchBooks();
    } catch (error) {
      console.error("Error toggling finished status:", error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div>
      <h1>Hello Next</h1>
      <p>This is my deployed address {contractAddress}</p>
      </div>
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative p-4 bg-white shadow-md sm:rounded-3xl sm:p-6">
        <h1 className="text-3xl font-bold mb-2">Library Management DApp</h1>
        {!connected ? (
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={connect}
          >
            Connect to MetaMask
          </button>
        ) : (
          <div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Add New Book</h2>
              <form onSubmit={addBook}>
                <input
                  type="text"
                  value={newBook.name}
                  onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
                  placeholder="Book Name"
                  className="block w-full pl-10 text-sm text-gray-700"
                />
                <input
                  type="text"
                  value={newBook.year}
                  onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                  placeholder="Year"
                  className="block w-full pl-10 text-sm text-gray-700"
                />
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="Author"
                  className="block w-full pl-10 text-sm text-gray-700"
                />
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Add Book
                </button>
              </form>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Book List</h2>
              <ul>
                {books.map((book, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>
                      {book.name} {`(${book.year})`} by {book.author}
                    </span>
                    <button
                      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => toggleFinished(index)}
                    >
                      {book.finished ? 'Mark as Unfinished' : 'Mark as Finished'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
    
    /*
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
    */
  );
}

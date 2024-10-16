import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await api.get(/bookclubs/${id});
        setClub(response.data);
      } catch (error) {
        console.error('Error fetching club details:', error);
      }
    };

fetchClub();
  }, [id]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{club.name}</h1>
      <h2>Books</h2>
      <ul>
        {club.books.map((book) => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetail;
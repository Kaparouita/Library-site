// routes.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import RegistrationForm from '../pages/register/RegistrationForm';
import Login from '../pages/login/Login';
import Guest from '../pages/guest/Guest';
import Admin from '../pages/admin/Admin';
import UserPage from '../pages/user/User';
import UserProfile from '../pages/user/UserProfile';
import BookReviews from '../pages/books/BookReviews';
import LibrarianProfile from '../pages/librarian/Librarian';

interface AppRoutesProps {
    isAuthenticated: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated }) => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/book/:bookId/reviews" element={<BookReviews />}/>
        <Route
            path="/admin/:userId"
            element={isAuthenticated ? <Admin /> : <Navigate to="/login" replace />}
        />
        <Route
            path="/user/:userId"
            element={isAuthenticated ? <UserPage /> : <Navigate to="/login" replace />}
        />
        <Route
            path="/user/:userId/edit-profile"
            element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" replace />}
        />
        <Route
            path="/librarian/:userId/"
            element={isAuthenticated ? <LibrarianProfile /> : <Navigate to="/login" replace />}
        />
    </Routes>
);

export default AppRoutes;

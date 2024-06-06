import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const RecentBoardsContext = createContext();

const RecentBoardsProvider = ({ children }) => {
    const [recentBoards, setRecentBoards] = useState([]);

    useEffect(() => {
        const visitedBoards = Cookies.get('visitedBoards') ? JSON.parse(Cookies.get('visitedBoards')) : [];
        setRecentBoards(visitedBoards);
    }, []);

    const addBoard = (newBoard) => {
        setRecentBoards((prevBoards) => {
            const updatedBoards = [...prevBoards.filter(board => board.school_code !== newBoard.school_code), newBoard];
            Cookies.set('visitedBoards', JSON.stringify(updatedBoards), { expires: 7 });
            return updatedBoards;
        });
    };

    const removeBoard = (school_code) => {
        setRecentBoards((prevBoards) => {
            const updatedBoards = prevBoards.filter(board => board.school_code !== school_code);
            Cookies.set('visitedBoards', JSON.stringify(updatedBoards), { expires: 7 });
            return updatedBoards;
        });
    };

    return (
        <RecentBoardsContext.Provider value={{ recentBoards, addBoard, removeBoard }}>
            {children}
        </RecentBoardsContext.Provider>
    );
};

export { RecentBoardsContext, RecentBoardsProvider };

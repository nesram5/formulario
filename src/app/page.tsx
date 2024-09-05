// pages/index.tsx
import React from 'react';
import ToDoList from '@/components/ToDoList';

const Home: React.FC = () => {
  return (
    <div>
      <ToDoList></ToDoList>
    </div>
  );
};

export default Home;
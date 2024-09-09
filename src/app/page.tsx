// pages/index.tsx
import React from 'react';
import TrelloLikeNotes from '@/components/TrelloLikeNotes';

const Home: React.FC = () => {
  return (
    <div>
      <TrelloLikeNotes></TrelloLikeNotes>
    </div>
  );
};

export default Home;
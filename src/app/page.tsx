<<<<<<< HEAD
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
=======
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
   <TodoList />
  );
}
>>>>>>> ce6ce93 (feat: renewed code from scrash)

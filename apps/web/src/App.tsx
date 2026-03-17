import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Explore } from '@/pages/Explore';
import { Projects } from '@/pages/Projects';
import { Stash } from '@/pages/Stash';
import { Tools } from '@/pages/Tools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 分钟
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/stash" element={<Stash />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

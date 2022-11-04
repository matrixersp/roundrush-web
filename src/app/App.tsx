import { Routes } from 'components/Routes';
import { Suspense } from 'react';

export default function App() {
  return (
    <Suspense fallback={'loading...'}>
      <Routes />
    </Suspense>
  );
}

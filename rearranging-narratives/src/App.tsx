import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './components/Shell/Header';
import { Toolbar } from './components/Shell/Toolbar';
import type { LayoutMode } from './components/Shell/Toolbar';
import { Content } from './components/Shell/Content';
import { Footer } from './components/Shell/Footer';
import { TimelineView } from './components/Views/TimelineView';
import { GridView } from './components/Views/GridView';
import './App.css';

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('timeline');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Header />
        <Toolbar layoutMode={layoutMode} onLayoutChange={setLayoutMode} />
        <Content>
          {layoutMode === 'timeline' ? <TimelineView /> : <GridView />}
        </Content>
        <Footer />
      </div>
    </DndProvider>
  );
}

export default App;
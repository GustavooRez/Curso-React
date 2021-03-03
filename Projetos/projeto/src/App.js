import './App.css';
import FilterProvider from './state/todos/Provider';
import TodosProvider from './state/filter/Provider';
import TodoApp from './pages/TodoApp/TodoApp';

function App() {
  return (
    <TodosProvider>
      <FilterProvider>
        <TodoApp/>
      </FilterProvider>
    </TodosProvider>
  );
}

export default App;

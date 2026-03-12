import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Calendar, Edit, Save } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [dateEditingTodoId, setDateEditingTodoId] = useState<number | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
      date: new Date().toISOString().split('T')[0],
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
    setDateEditingTodoId(null); // Close date picker if open
  };

  const saveEditing = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingTodoId(null);
  };

  const handleTextKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      saveEditing(id);
    }
  };

  const handleDateChange = (id: number, newDate: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, date: newDate } : todo)));
  };

  const handleDateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setDateEditingTodoId(null);
    }
  };
  
  const startEditingDate = (todo: Todo) => {
    setDateEditingTodoId(todo.id);
    setEditingTodoId(null); // Close text editor if open
  };


  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <section id="todo" className="py-20 px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">待辦事項</h2>
          <form onSubmit={addTodo} className="flex gap-4 mb-6">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="新增待辦事項..."
              className="flex-grow px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2">
              <Plus size={20} />
              <span>新增</span>
            </button>
          </form>

          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>全部</button>
            <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>待辦</button>
            <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>完成</button>
          </div>

          <ul className="space-y-4">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`relative flex items-center justify-between p-4 rounded-xl ${todo.completed ? 'bg-slate-100 text-slate-500' : 'bg-white border border-slate-200'}`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div onClick={() => toggleTodo(todo.id)} className="cursor-pointer">
                    {todo.completed ? <CheckCircle size={24} className="text-green-500" /> : <Circle size={24} className="text-slate-400" />}
                  </div>
                  <div className="w-full">
                    {editingTodoId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={e => setEditingText(e.target.value)}
                        onKeyDown={e => handleTextKeyDown(e, todo.id)}
                        onBlur={() => saveEditing(todo.id)}
                        className="w-full text-lg bg-transparent focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <span onDoubleClick={() => startEditing(todo)} className={`text-lg ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      {dateEditingTodoId === todo.id ? (
                        <>
                          <Calendar size={14} className="cursor-pointer" onClick={() => setDateEditingTodoId(null)} />
                          <input
                            type="date"
                            value={todo.date}
                            onChange={e => handleDateChange(todo.id, e.target.value)}
                            onBlur={() => setDateEditingTodoId(null)}
                            onKeyDown={handleDateKeyDown}
                            autoFocus
                            className="w-full bg-transparent focus:outline-none"
                          />
                        </>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => startEditingDate(todo)}>
                          <span>{todo.date}</span>
                          <Calendar size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editingTodoId === todo.id ? saveEditing(todo.id) : startEditing(todo)} className="text-slate-400 hover:text-blue-500 transition-colors">
                    {editingTodoId === todo.id ? <Save size={20} /> : <Edit size={20} />}
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TodoList;

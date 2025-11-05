import AsyncStorage from '@react-native-async-storage/async-storage';

// export type Todo =;

const TODOS_KEY = 'todos';

export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const raw = await AsyncStorage.getItem(TODOS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch (error) {
    console.error('Error loading todos', error);
    return [];
  }
};

export const saveTodos = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos', error);
  }
};

export const addTodo = async (todo: Todo) => {
  try {
    const current = await loadTodos();
    current.unshift(todo);
    await saveTodos(current);
  } catch (error) {
    console.error('Error adding todo', error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const current = await loadTodos();
    const filtered = current.filter((t) => t.id !== id);
    await saveTodos(filtered);
  } catch (error) {
    console.error('Error deleting todo', error);
  }
};

export const updateTodo = async (id: string, patch: Partial<Todo>) => {
  try {
    const current = await loadTodos();
    const updated = current.map((t) => (t.id === id ? { ...t, ...patch } : t));
    await saveTodos(updated);
  } catch (error) {
    console.error('Error updating todo', error);
  }
};

export const clearCompletedTodos = async () => {
  try {
    const current = await loadTodos();
    const filtered = current.filter((t) => !t.done);
    await saveTodos(filtered);
  } catch (error) {
    console.error('Error clearing completed todos', error);
  }
};
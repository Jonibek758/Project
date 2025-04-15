// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Todo } from '../types';
// import { Search, Edit, Trash } from 'lucide-react';
// import Pagination from '../components/Pagination';
// import DeleteModal from '../components/DeleteModal';

// export default function Todos() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalTodos, setTotalTodos] = useState(0);
//   const [limit] = useState(10);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

//   useEffect(() => {
//     fetchTodos();
//   }, [search, filter, currentPage]);

//   const fetchTodos = async () => {
//     try {
//       const start = (currentPage - 1) * limit;
//       let url = `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`;
      
//       if (search) {
//         url += `&q=${search}`;
//       }
//       if (filter !== 'all') {
//         url += `&completed=${filter === 'completed'}`;
//       }

//       const response = await axios.get(url);
//       setTodos(response.data);
//       const totalCount = parseInt(response.headers['x-total-count'] || '0');
//       setTotalTodos(totalCount);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   const handleEdit = (todo: Todo) => {
//     setEditingTodo(todo);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (todo: Todo) => {
//     setTodoToDelete(todo);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!todoToDelete) return;
//     try {
//       await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoToDelete.id}`);
//       setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
//       setIsDeleteModalOpen(false);
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   const handleUpdateTodo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTodo) return;
//     try {
//       await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, editingTodo);
//       setTodos(todos.map(todo => todo.id === editingTodo.id ? editingTodo : todo));
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error('Error updating todo:', error);
//     }
//   };

//   const toggleComplete = async (todo: Todo) => {
//     try {
//       const updatedTodo = { ...todo, completed: !todo.completed };
//       await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, updatedTodo);
//       setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
//     } catch (error) {
//       console.error('Error toggling todo completion:', error);
//     }
//   };

//   return (
//     <div className='flex flex-col align-items-center '>
//     <div>nknknj</div>
//     <div className='container mx-auto p-4 '>
     
//       <div className="mb-6 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search todos..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-lg"
//             />
//           </div>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'incomplete')}
//             className="border rounded-lg px-4 py-2"
//           >
//             <option value="all">All</option>
//             <option value="completed">Completed</option>
//             <option value="incomplete">Incomplete</option>
//           </select>
//         </div>
//         <button
//           onClick={() => {
//             setEditingTodo(null);
//             setIsEditModalOpen(true);
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//         >
//           Add Todo
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {todos.map((todo) => (
//               <tr key={todo.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <input
//                     type="checkbox"
//                     checked={todo.completed}
//                     onChange={() => toggleComplete(todo)}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={todo.completed ? 'line-through text-gray-500' : ''}>
//                     {todo.title}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleEdit(todo)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <Edit size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(todo)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <Trash size={20} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pagination
//         totalItems={totalTodos}
//         itemsPerPage={limit}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//       />

//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-4">
//               {editingTodo ? 'Edit Todo' : 'Add Todo'}
//             </h3>
//             <form onSubmit={handleUpdateTodo}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Title</label>
//                   <input
//                     type="text"
//                     value={editingTodo?.title || ''}
//                     onChange={(e) => setEditingTodo(prev => prev ? {...prev, title: e.target.value} : null)}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//                 {editingTodo && (
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={editingTodo.completed}
//                       onChange={(e) => setEditingTodo({...editingTodo, completed: e.target.checked})}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <label className="ml-2 block text-sm text-gray-900">
//                       Completed
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   {editingTodo ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <DeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={confirmDelete}
//         title="Are you sure you want to delete this todo?"
//       />
//     </div>
//     </div>

//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo, User } from '../types';
import { Search, Edit, Trash } from 'lucide-react';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const [limit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [search, filter, currentPage, selectedUserId]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTodos = async () => {
    try {
      const start = (currentPage - 1) * limit;
      let url = `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`;

      if (search) url += `&q=${search}`;
      if (filter !== 'all') url += `&completed=${filter === 'completed'}`;
      if (selectedUserId) url += `&userId=${selectedUserId}`;

      const response = await axios.get(url);
      setTodos(response.data);
      const totalCount = parseInt(response.headers['x-total-count'] || '0');
      setTotalTodos(totalCount);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleDelete = (todo: Todo) => {
    setTodoToDelete(todo);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!todoToDelete) return;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoToDelete.id}`);
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo) return;
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, editingTodo);
      setTodos(todos.map(todo => todo.id === editingTodo.id ? editingTodo : todo));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const toggleComplete = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, updatedTodo);
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  return (
    <div className="flex">
      <div className="w-64 border-r h-screen overflow-y-auto bg-white shadow">
        <h2 className="text-lg font-semibold p-4 border-b">Users</h2>
        <ul>
          <li
            onClick={() => setSelectedUserId(null)}
            className={`p-4 cursor-pointer border-b hover:bg-blue-50 ${
              selectedUserId === null ? 'bg-blue-100 font-semibold' : ''
            }`}
          >
            All Users
          </li>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                setSelectedUserId(user.id);
                setCurrentPage(1);
              }}
              className={`p-4 cursor-pointer border-b hover:bg-blue-50 ${
                selectedUserId === user.id ? 'bg-blue-100 font-semibold' : ''
              }`}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search todos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'incomplete')}
              className="border rounded-lg px-4 py-2"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <button
            onClick={() => {
              setEditingTodo(null);
              setIsEditModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Todo
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(todo)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={totalTodos}
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">
                {editingTodo ? 'Edit Todo' : 'Add Todo'}
              </h3>
              <form onSubmit={handleUpdateTodo}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={editingTodo?.title || ''}
                      onChange={(e) => setEditingTodo(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {editingTodo && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingTodo.completed}
                        onChange={(e) => setEditingTodo({ ...editingTodo, completed: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">Completed</label>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {editingTodo ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Are you sure you want to delete this todo?"
        />
      </div>
    </div>
  );
}

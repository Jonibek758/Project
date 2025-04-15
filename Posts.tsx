import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post, User, Comment } from '../types';
import { Search, Edit, Trash, MessageCircle } from 'lucide-react';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [limit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedPostComments, setSelectedPostComments] = useState<Comment[]>([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedUser, search, currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const start = (currentPage - 1) * limit;
      let url = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`;
      
      if (selectedUser) {
        url += `&userId=${selectedUser}`;
      }
      if (search) {
        url += `&q=${search}`;
      }

      const response = await axios.get(url);
      setPosts(response.data);
      const totalCount = parseInt(response.headers['x-total-count'] || '0');
      setTotalPosts(totalCount);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      setSelectedPostComments(response.data);
      setIsCommentsModalOpen(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };


  const handleDelete = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postToDelete.id}`);
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${editingPost.id}`, editingPost);
      setPosts(posts.map(post => post.id === editingPost.id ? editingPost : post));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleAddComment = async (postId: number, comment: Partial<Comment>) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
        ...comment,
        postId
      });
      setSelectedPostComments([...selectedPostComments, response.data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateComment = async (comment: Comment) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, comment);
      setSelectedPostComments(selectedPostComments.map(c => c.id === comment.id ? comment : c));
      setCommentToEdit(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
      setSelectedPostComments(selectedPostComments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setIsEditModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.body}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
            <button
              onClick={() => fetchComments(post.id)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <MessageCircle size={20} />
              <span>Comments</span>
            </button>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={totalPosts}
        itemsPerPage={limit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              {editingPost ? 'Edit Post' : 'Add Post'}
            </h3>
            <form onSubmit={handleUpdatePost}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editingPost?.title || ''}
                    onChange={(e) => setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={editingPost?.body || ''}
                    onChange={(e) => setEditingPost(prev => prev ? {...prev, body: e.target.value} : null)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
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
                  {editingPost ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCommentsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              <button
                onClick={() => setIsCommentsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {selectedPostComments.map((comment) => (
                <div key={comment.id} className="border-b pb-4">
                  {commentToEdit?.id === comment.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={commentToEdit.name}
                        onChange={(e) => setCommentToEdit({...commentToEdit, name: e.target.value})}
                        className="w-full border rounded p-2"
                      />
                      <textarea
                        value={commentToEdit.body}
                        onChange={(e) => setCommentToEdit({...commentToEdit, body: e.target.value})}
                        className="w-full border rounded p-2"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setCommentToEdit(null)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateComment(commentToEdit)}
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">{comment.name}</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setCommentToEdit(comment)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{comment.email}</p>
                      <p className="mt-2">{comment.body}</p>
                    </div>
                  )}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const nameInput = form.elements.namedItem('name') as HTMLInputElement;
                  const emailInput = form.elements.namedItem('email') as HTMLInputElement;
                  const bodyInput = form.elements.namedItem('body') as HTMLTextAreaElement;
                  
                  handleAddComment(postToDelete?.id || 0, {
                    name: nameInput.value,
                    email: emailInput.value,
                    body: bodyInput.value
                  });
                  form.reset();
                }}
                className="space-y-3"
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full border rounded p-2"
                  required
                />
                <textarea
                  name="body"
                  placeholder="Write a comment..."
                  className="w-full border rounded p-2"
                  rows={3}
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Are you sure you want to delete this post?"
      />
    </div>
  );
}
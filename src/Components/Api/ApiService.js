class ApiService {
    constructor() {
        this.baseURL = 'https://jsonplaceholder.typicode.com';
      }
  
    async getPosts() {
      try {
        const response = await fetch(`${this.baseURL}/posts`);
        if (!response.ok) {
          throw new Error(`Failed to fetch posts. Status code: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`An error occurred while fetching posts: ${error.message}`);
      }
    }
  
    async getPostById(postId) {
      try {
        const response = await fetch(`${this.baseURL}/posts/${postId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch post by ID ${postId}. Status code: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`An error occurred while fetching post by ID: ${error.message}`);
      }
    }
  
    async getPostComments(postId) {
      try {
        const response = await fetch(`${this.baseURL}/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error(`Failed to fetch comments for post ID ${postId}. Status code: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`An error occurred while fetching comments for post ID: ${error.message}`);
      }
    }
  
    async getCommentsByPostId(postId) {
      try {
        const response = await fetch(`${this.baseURL}/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch comments for post ID ${postId}. Status code: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`An error occurred while fetching comments for post ID: ${error.message}`);
      }
    }
  }
  
  export default ApiService;
  
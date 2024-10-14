const blogController = require('../controllers/blogs');

import express from 'express'
import { isAuthor } from '../middlewares';

export default (router: express.Router) => {
    router.post('/blogs', blogController.createBlog);
    router.get('/blogs', blogController.getAllBlogs);
    router.get('/blogs/:id', blogController.getBlogById);
    router.put('/blogs/:id', isAuthor,  blogController.updateBlog);
    router.delete('/blogs/:id', isAuthor, blogController.deleteBlog);
    router.get('/blogs-pagination', blogController.getAllBlogsByQuery);
}
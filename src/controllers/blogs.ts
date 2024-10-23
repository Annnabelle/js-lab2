
import { Blog } from '../db/blog';

export const createBlog = async (req : any, res: any) => {
  try {
    const { title, content, author } = req.body;
    const blog = new Blog({ title, content, author });
    await blog.save();
    res.status(201).json(blog).send('You have added blog!')
  } catch (error) {
    return res.sendStatus(400)
  }
};

export const getAllBlogs = async (req: any, res: any) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    return res.sendStatus(500)
  }
};

export const getBlogById = async (req:any, res: any) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    return res.sendStatus(500)
  }
};

export const updateBlog = async (req: any, res: any) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, { title, content, author }, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog).send('Blog updated!');
  } catch (error) {
    return res.sendStatus(400)
  }
};

export const deleteBlog = async (req: any, res: any) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    return res.sendStatus(500)
  }
};

export const getAllBlogsByQuery = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit; 

    const totalBlogs = await Blog.countDocuments();
    const blogs = await Blog.find().skip(skip).limit(limit);

    res.json({
      total: totalBlogs,
      page,
      pages: Math.ceil(totalBlogs / limit), 
      limit, 
      blogs, 
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
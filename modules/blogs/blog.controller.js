const Model = require("./blog.model");
const bookmarkModel = require("../bookmarks/bookmark.model");
const create = (payload) => {};
const getAll = () => {};
// const get = () => {};
const getById = (_id) => {};
const updateById = (_id, payload) => {};
const removeById = (_id) => {};
const bookMark = (payload) => {
  const { blogs, user } = payload;
  if (!blogs.length > 0 || !user) throw new Error("Blog or user missing");
  bookmarkModel.create(payload);
};
const authorBlogs = (userId) => {};
module.exports = {
  create,
  getAll,
  // get,
  getById,
  updateById,
  removeById,
  bookMark,
  authorBlogs,
};

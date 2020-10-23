const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");

// user can have many posts. joined together with foreignkey
User.hasMany(Post, {
  foreignKey: "user_id",
});

// a post will always have one user
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// when accessing through vote, can pull data from User table
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

// when accessing through vote, can pull data from Post table
Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

// create direct relationship between vote and user
Vote.belongsTo(User, {
  foreignKey: "user_id",
});

// create direct relationship between vote and post
Vote.belongsTo(Post, {
  foreignKey: "user_id",
});

// states a user can have many votes
User.hasMany(Vote, {
  foreignKey: "user_id",
});

// states a post can have many votes
Post.hasMany(Vote, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote };

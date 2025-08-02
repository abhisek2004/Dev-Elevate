import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    coverImage: {
      type: String,
      // required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    commentCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);



const slugifyTitle = newsSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Check for existing slugs for the same author
  // if same slugs exist, append a counter which increase for every duplicate title and slug.
  while (
    await mongoose.models.News.findOne({ slug, author: this.author, _id: { $ne: this._id } })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
  next();
});


export const News =  mongoose.model("News", newsSchema);


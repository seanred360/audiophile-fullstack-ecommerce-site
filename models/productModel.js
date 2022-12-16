import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  id: Schema.Types.ObjectId,
  slug: String,
  name: String,
  image: Map,
  category: String,
  new: Boolean,
  price: Number,
  description: String,
  features: String,
  includes: [],
  gallery: Map
});

const Test = models.Test || model("Test", productSchema);

export default Test;

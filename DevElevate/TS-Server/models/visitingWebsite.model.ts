import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IVisitingWebsite extends Document {
  _id: Types.ObjectId;      // Explicitly include _id
  user: Types.ObjectId;
  dateOfVisiting: Date;
  visit: boolean;
}

const visitingWebsiteSchema: Schema<IVisitingWebsite> = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dateOfVisiting: { type: Date, required: true, default: Date.now },
    visit: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const VisitingWebsite: Model<IVisitingWebsite> = mongoose.model<IVisitingWebsite>(
  "VisitingWebsite",
  visitingWebsiteSchema
);

export default VisitingWebsite;

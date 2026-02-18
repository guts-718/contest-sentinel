import mongoose, { Schema, Document } from "mongoose";
import { Platform } from "../types/contest.types";
// Type 'string' is not assignable to type 'ObjectId' when i did _id: string ... 
// export interface ContestDocument extends Document
// mongoose Document type = Document<TId>
// default - Document<ObjectId>

export interface ContestDocument extends Document<string>{
  _id: string;
  platform: Platform;
  title: string;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  url: string;
}

const ContestSchema = new Schema<ContestDocument>({
  _id: { type: String, required: true },

  platform: {
    type: String,
    enum: Object.values(Platform),
    required: true,
    index: true,
  },

  title: {
    type: String,
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
    index: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  durationMinutes: {
    type: Number,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },
});

// compound index for fast filtering
ContestSchema.index({ startTime: 1, platform: 1 });

export const ContestModel =
  mongoose.models.Contest ||
  mongoose.model<ContestDocument>("Contest", ContestSchema);

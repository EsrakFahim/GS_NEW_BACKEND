import mongoose, { Schema } from "mongoose";

// Define a sub document schema for files
const FileSchema = new Schema(
      {
            url: {
                  type: String,
                  required: [true, "File URL is required"],
                  match: [/^https?:\/\/[^\s]+$/, "Invalid URL format"],
            },
            name: {
                  type: String,
                  required: [true, "File name is required"],
                  trim: true,
                  maxlength: 100,
            },
      },
      {
            _id: false,
      },
      {
            timestamps: true,
      }
);

const projectsSchema = new Schema(
      {
            name: {
                  type: String,
                  required: [true, "Project name is required"],
                  trim: true,
                  maxlength: 100,
                  index: true, // Index for quick lookup
            },
            description: {
                  type: String,
                  required: [true, "Project description is required"],
                  maxlength: 500,
            },
            client: {
                  type: String,
                  required: [false, "Client name is required"],
                  trim: true,
                  maxlength: 100,
            },
            projectType: {
                  type: String,
                  enum: [
                        "Website",
                        "Mobile App",
                        "Software",
                        "Consulting",
                        "Design",
                        "Marketing",
                        "Other",
                  ],
                  required: true,
            },
            status: {
                  type: String,
                  enum: [
                        "Pending",
                        "Ongoing",
                        "Completed",
                        "On Hold",
                        "Cancelled",
                  ],
                  required: true,
                  index: true, // Index for frequently queried status
            },
            startDate: {
                  type: Date,
                  required: [false, "Project start date is required"],
            },
            endDate: {
                  type: Date,
                  validate: {
                        validator: function (v) {
                              return !v || v >= this.startDate;
                        },
                        message: "End date should be after start date",
                  },
                  default: null,
            },
            projectManager: {
                  type: String, // Change to `ObjectId` if referencing another collection
                  required: [true, "Project manager is required"],
                  trim: true,
            },
            team: {
                  type: [{ type: String, trim: true }], // Change to `ObjectId` if referencing another collection
                  required: false,
                  validate: {
                        validator: (v) => Array.isArray(v) && v.length > 0,
                        message: "Team should contain at least one member",
                  },
            },
            budget: {
                  type: Number,
                  required: false,
                  min: 0,
                  default: 0,
            },
            spent: {
                  type: Number,
                  required: false,
                  min: 0,
                  default: 0,
                  validate: {
                        validator: function (v) {
                              return v <= this.budget;
                        },
                        message: "Spent amount cannot exceed the budget",
                  },
            },
            tech: {
                  type: [{ type: String, trim: true }],
                  required: false,
            },
            files: {
                  type: [FileSchema],
                  default: [],
            },
            notes: {
                  type: String,
                  maxlength: 1000,
                  default: "",
            },
            livePreview: {
                  type: String,
                  match: [/^https?:\/\/[^\s]+$/, "Invalid URL format"],
                  default: null,
            },
            sourceFile: {
                  type: String,
                  match: [/^https?:\/\/[^\s]+$/, "Invalid URL format"],
                  default: null,
            },
            isActive: {
                  type: Boolean,
                  default: true,
                  index: true, // Index for active status filtering
            },
      },
      {
            timestamps: true,
      }
);

// Compound index for frequent queries involving project name, status, and isActive
projectsSchema.index({ name: 1, status: 1, isActive: 1 });

const Projects = mongoose.model("Projects", projectsSchema);

export { Projects };

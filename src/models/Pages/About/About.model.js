import mongoose, { Schema } from "mongoose";

const aboutSchema = new Schema(
      {
            title: {
                  type: String,
                  required: true,
                  trim: true,
                  maxlength: 120,
                  default: "About Us",
            },
            description: {
                  type: String,
                  required: true,
                  trim: true,
                  maxlength: 500,
                  default: "We are a creative agency that focuses on design, development, and growing your business.",
            },
            images: {
                  type: [
                        {
                              imageUrl: {
                                    type: String,
                                    required: true,
                                    match: [
                                          /^https?:\/\/[^\s]+$/,
                                          "Invalid URL format for image",
                                    ],
                              },
                              altText: {
                                    type: String,
                                    trim: true,
                                    maxlength: 100,
                                    default: "",
                              },
                        },
                  ],
                  validate: {
                        validator: function (value) {
                              return value.length >= 3; // Ensure at least 3 items
                        },
                        message: "At least 3 images are required.",
                  },
            },
            whyWeTitle: { 
                  type: String,
                  required: true,
                  trim: true,
                  maxlength: 200,
                  default: "Why Choose Us?",
            },
            whyWeDescription: {
                  type: String,
                  required: true,
                  trim: true,
                  maxlength: 500,
                  default: "We are a team of professionals who will help you grow your business.",
            },
            whyWeImage: { // quantity of image is 1
                  type: String,
                  required: true,
                  match: [
                        /^https?:\/\/[^\s]+$/,
                        "Invalid URL format for image",
                  ],
            },
            benefits: [
                  {
                        title: {
                              type: String,
                              required: true,
                              trim: true,
                              maxlength: 100,
                        },
                        description: {
                              type: String,
                              required: true,
                              trim: true,
                              maxlength: 300,
                        },
                  },
            ],
            isActive: {
                  type: Boolean,
                  default: true,
                  index: true,
            },
      },
      {
            timestamps: true,
      }
);

const About = mongoose.model("About", aboutSchema);

export { About };

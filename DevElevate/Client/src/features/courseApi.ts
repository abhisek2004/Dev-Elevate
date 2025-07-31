import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Course_Api = "http://localhost:5000/api/admin/courses";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: Course_Api,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllcourses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createCourse: builder.mutation({
      query: ({ courseTitle, description, tags }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, description, tags },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    editLecture: builder.mutation({
      query: ({
        courseTitle,
        subTitle,
        description,
        dificulty,
        coursePrice,
        courseThumbnail,
        moduleTitle,
        videoUrl,
        resourceLinks,
        duration,
        courseId,
        moduleId,
      }) => ({
        url: `/${courseId}/module/${moduleId}`,
        method: "POST",
        body: {  
            courseTitle,
            subTitle,
            description,
            dificulty,
            coursePrice,
            courseThumbnail,
            moduleTitle,
            videoUrl,
            resourceLinks,
            duration
        },
      }),
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
  }),
});

export const {
    useGetAllcoursesQuery,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useEditLectureMutation
} = courseApi;
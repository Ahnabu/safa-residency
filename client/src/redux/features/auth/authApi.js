import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (userInfo) => ({
        url: '/auth',
        method: 'POST',
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getAllUsers: builder.query({
      query:(args) =>{
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return{
          url:'/users',
          method:'GET',
          params: params
        }
      },
      providesTags:['User']
    }),
    getAdminStats: builder.query({
      query:() =>{
        return{
          url:'/admin',
          method:'GET',
        }
      },
      providesTags:['User', 'Booking', 'Room', "Service"]
    }),
    updateUser: builder.mutation({
      query: (userPayload) => {

        return {
          url: `/users/${userPayload.id}`,
          method: "PUT",
          body: userPayload.payload,
        };
      },
      invalidatesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (email) => {
        return {
          url: `/users/${email}`,
          method: "GET"
        };
      },
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
    updateOwnProfile: builder.mutation({
      query: (profileData) => {
        return {
          url: '/profile',
          method: 'PATCH',
          body: profileData,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => {
        return {
          url: '/password',
          method: 'PATCH',
          body: passwordData,
        };
      },
    }),
  }),
})

export const {
  useGetTokenMutation,
  useLoginMutation,
  useGetAdminStatsQuery, 
  useGetSingleUserQuery, 
  useGetAllUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation,
  useUpdateOwnProfileMutation,
  useUpdatePasswordMutation
} = authApi
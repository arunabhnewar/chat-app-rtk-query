import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // register
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    })
                    );

                    dispatch(userLoggedIn(
                        {
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        }
                    ))
                } catch (err) {

                }
            }
        }),
        // login
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    })
                    );

                    dispatch(userLoggedIn(
                        {
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        }
                    ))
                } catch (err) {

                }
            }
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
// utils/tokenUtils.ts
import axios from 'axios'

export const getAccessToken = () => {
    return localStorage.getItem('access_token')
}

export const getRefreshToken = () => {
    const cookies = document.cookie.split('; ')
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refresh_token='))
    return refreshTokenCookie ? refreshTokenCookie.split('=')[1] : null
}

export const refreshAccessToken = async (BASEURL: string) => {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
        // If there is no refresh token, redirect to login
        window.location.href = "/sign-in"
        return null
    }

    try {
        const response = await axios.post(`${BASEURL}/users/api/token/refresh/`, { refresh: refreshToken })
        const { access } = response.data

        // Store the new access token
        localStorage.setItem('access_token', access)

        return access
    } catch (error: unknown) {
        console.error('Error refreshing token:', error)

        // Handle the case where the refresh token has expired or is invalid
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            // Clear any stored tokens
            localStorage.removeItem('access_token')
            document.cookie = 'refresh_token=; Max-Age=0'  // Delete refresh token cookie

            // Redirect to the sign-in page
            window.location.href = "/sign-in"
        }

        return null
    }
}

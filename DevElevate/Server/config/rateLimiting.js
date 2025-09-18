import { config } from 'dotenv';
config();

const configLimits = {
    guest: {
        points: Number(process.env.RATE_LIMIT_GUEST_POINTS) || 50,
        duration: Number(process.env.RATE_LIMIT_GUEST_DURATION) || 60,
    },
    auth: {
        points: Number(process.env.RATE_LIMIT_AUTH_POINTS) || 5,
        duration: Number(process.env.RATE_LIMIT_AUTH_DURATION) || 60,
    },
    user: {
        points: Number(process.env.RATE_LIMIT_USER_POINTS) || 100,
        duration: Number(process.env.RATE_LIMIT_USER_DURATION) || 60,
    }
}

export default configLimits;
import helmet from 'helmet';
import hpp from 'hpp';

export const applySecurityMiddleware = (app) => {

    app.use(helmet({
        frameguard: { action: 'deny' },
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        noSniff: true,
        xssFilter: true,
        referrerPolicy: { policy: "no-referrer" }
    }));


    app.use(hpp());

}
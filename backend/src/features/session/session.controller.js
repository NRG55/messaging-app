import { SessionService } from './session.service.js';

export const SessionController = {
    async recordUserActivity(req, res, next) {
        try {
            const id = req.user?.id;
    
            if (!id) {
                throw new Error('UNAUTHORIZED');
            }
    
            await SessionService.recordUserActivity(id);
    
            return res.sendStatus(204);
    
        } catch (error) {
            next(error);
        }
    },
};
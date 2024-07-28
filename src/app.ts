import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
});

export default app;

import { setupRoutes } from '@/main/config/routes';

import express from 'express';
import { openDB } from '@/database/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);
openDB();

export default app;

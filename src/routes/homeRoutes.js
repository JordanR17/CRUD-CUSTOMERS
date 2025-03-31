import express from 'express';
import homeController from '../controllers/HomeController.js';
import { verifyCsrfToken, regenerateCsrfToken} from '../middlewares/csrfMiddlewere.js';

const router = express.Router();

router.get('/', homeController.homePage);

router.get('/create', homeController.create);
router.post('/create',verifyCsrfToken, homeController.handleCreate, regenerateCsrfToken);

router.get('/update/:id', homeController.update);
router.put('/update/:id', verifyCsrfToken, homeController.handleUpdate, regenerateCsrfToken);

router.delete('/delete/:id',verifyCsrfToken, homeController.delete);



export default router;
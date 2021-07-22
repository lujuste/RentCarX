import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
})

const importCategoryController = new ImportCategoryController();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", /*(request, response) => {
    return listCategoriesController.handle(request, response);
}*/ listCategoriesController.handle)

categoriesRoutes.post("/import",
    upload.single("file"),
    // (request, response) => { return importCategoryController.handle(request, response) }
    importCategoryController.handle
)

export { categoriesRoutes }
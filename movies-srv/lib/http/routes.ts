import { Request, Response, Express } from "express";
import { UserController } from "../controllers/user";
import { MovieController } from "../controllers/movie";

export class Routes {
    private static userController = new UserController();
    private static movieController = new MovieController();

    public static buildRoutes(app: Express) {
        app.route('/').get((req: Request, res: Response) => res.json({result: "success"}) );

        app.route('/movie').post((req: Request, res: Response) => this.movieController.create(req, res));
        app.route('/movie').get((req: Request, res: Response) => this.movieController.list(req, res));
        app.route('/movie/:id').get((req: Request, res: Response) => this.movieController.get(req, res));
        app.route('/movie').put((req: Request, res: Response) => this.movieController.update(req, res));
        app.route('/movie/:id').delete((req: Request, res: Response) => this.movieController.delete(req, res));
        app.route('/subscribe').post((req: Request, res: Response) => this.userController.create(req, res)); 
        app.route('/login').post((req: Request, res: Response) => this.userController.login(req, res));
    }
}
import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import elevator from './routes/elevatorRoute';
import connection from './routes/connectionRoute';
import robotType from './routes/robotTypesRoute';
import robot from './routes/robotRoute';
import room from './routes/roomRoute';
import log from './routes/logRoute';
import threeD from "./routes/threeDRoute";
import path from "./routes/pathRoute";
export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
	elevator(app);
	connection(app);
	robotType(app);
	robot(app);
	room(app);
	log(app);
	threeD(app);
	path(app);
	
	return app
}
import { Response, Request } from 'express';

import { Container} from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';


exports.getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui
    console.log('getMe function called');
    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.auth || req.auth == undefined )
        console.log('Token not found or invalid');
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    console.log('Token found:', req.token);
    const user = await userRepo.findById( req.auth.id );
    console.log('User retrieved:', user);

    if (!user)
        console.log('User not registered');
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    console.log('User DTO:', userDTO);
    return res.json( userDTO ).status(200);
}

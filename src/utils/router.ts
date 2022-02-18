import { IRouter, Pairs, Router } from "../constants/router";

export function getRouterInfo(
    address: string
): IRouter | null {
  
    // Please ensure the pair is included in the Pairs
    if(Pairs.includes(address.toLowerCase())) {
        const index = Pairs.indexOf(address.toLowerCase());

        const routerInfo = Router.at(index);

        return routerInfo;
    }
    
    return null;
}
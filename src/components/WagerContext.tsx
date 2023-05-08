import { createContext } from 'react';
import {IWager} from "./Marketplace";


interface IWagerContext {
    wagers: IWager[];
    fetchWagers: () => void;
    loading: boolean;
}

const initialWagerContext: IWagerContext = {
    wagers: [],
    fetchWagers: () => {},
    loading: true,
};

const WagerContext = createContext<IWagerContext>(initialWagerContext);

export default WagerContext;

import axios from 'axios';
import { GO_HOME, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { STATES } from 'mongoose';


export const reroute = (component) => (dispatch) => {
    switch (component) {
        case 'Home':
            dispatch({
                type: GO_HOME
            })
    }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

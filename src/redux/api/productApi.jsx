import { setProducts } from "../productSlice";

import { mockData } from "../../assets/mockData";

export const fetchProducts = () => async (dispatch) => {
  dispatch(setProducts(mockData));
};

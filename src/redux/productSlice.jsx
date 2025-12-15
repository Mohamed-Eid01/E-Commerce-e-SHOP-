import { createSlice } from "@reduxjs/toolkit";
import { MdFilterDrama } from "react-icons/md";


const initialState = {
products:[],
searchTerm:'',
filterData:[],
category:''
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setSearchTerm(state,action){
      state.searchTerm=action.payload
      state.filterData =state.products.filter(product=>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }
  },
});

export const { setProducts, setSearchTerm } = productSlice.actions;
export default productSlice.reducer
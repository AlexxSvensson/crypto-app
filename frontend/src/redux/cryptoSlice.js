import { createSlice } from '@reduxjs/toolkit'

export const cryptoSlice = createSlice({
  name: 'cryptos',
  initialState: {
    priceList: {},
    cryptoNames: [],
    portfolios: [],
    currentPortfolio: [],
    tempPortfolio: [],
    currentPortfolioIndex: 0,
    editMode: false
  },
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    setCryptoPrices: (state, action) => {
      const names = Object.keys(action.payload.cryptos)
      state.priceList = action.payload;
      state.cryptoNames = names;
    },
    setPortfolios: (state, action) => {
      state.portfolios = action.payload.portfolios;
    },
    setCurrentPortfolio: (state, action) => {
      const index = action.payload.index;
      state.currentPortfolio = state.portfolios[index];
      state.tempPortfolio = state.portfolios[index];
      state.currentPortfolioIndex = index;
    },
    setTempPortfolio: (state, action) => {
      state.tempPortfolio = action.payload.portfolio;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setCryptoPrices, 
  setCurrentPortfolio, 
  setTempPortfolio, 
  setPortfolios,
  setEditMode
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface CounterState {
  originalStaf: any,

  length: number,
  width: number,
  height: number,

  averagePrice: number,
  purchasePrice: number,
  commission: number,
  weight: number,
  volume: number,
}

const initialState: CounterState = {
  originalStaf: null,

  length: 0,
  width: 0,
  height: 0,

  averagePrice: 0,
  purchasePrice:0,
  commission: 0,
  weight: 0,
  volume: 0
}

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    /////Первоначальный объект
    changeOriginalStaf: (state, action: PayloadAction<object|null>) => {
      state.originalStaf = action.payload
    },

    ///Габариты
    changeLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload
    },

    changeWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload
    },

    changeHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload
    },


    


    changeAveragePrice: (state, action: PayloadAction<number>) => {
      state.averagePrice = action.payload
    },
    changePurchasePrice: (state, action: PayloadAction<number>) => {
      state.purchasePrice = action.payload
    },

    changeCommission: (state, action: PayloadAction<number>) => {
      state.commission = action.payload
    },
    changeWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload
    },
    changeVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
  },
})

export const { changeOriginalStaf, changeAveragePrice,changePurchasePrice, changeCommission, changeWeight, changeVolume, changeLength, changeWidth, changeHeight } = goodsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const OriginalStaf = (state: RootState) => state.goods.originalStaf

export const Length = (state: RootState) => state.goods.length
export const Width = (state: RootState) => state.goods.width
export const Height = (state: RootState) => state.goods.height

export const AveragePrice = (state: RootState) => state.goods.averagePrice
export const PurchasePrice = (state: RootState) => state.goods.purchasePrice

export const Commission = (state: RootState) => state.goods.commission
export const Weight = (state: RootState) => state.goods.weight
export const Volume = (state: RootState) => state.goods.volume



export default goodsSlice.reducer
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

  curs_dol: number,
  curs_uan: number,

  price_uan_from: number,
  price_uan_to: number,

  rate_per_kg: number,


  cost_price_from: number,
  cost_price_to: number,



  density:number

}

const initialState: CounterState = {


  //first step
  originalStaf: null,

  length: 0,
  width: 0,
  height: 0,

  averagePrice: 0,
  purchasePrice: 0,
  commission: 0,
  weight: 0,
  volume: 0,

  curs_dol: 75.88,
  curs_uan: 10.91,
  /////

  //second step
  price_uan_from: 0,
  price_uan_to: 0,

  rate_per_kg: 0,

  cost_price_from: 0,
  cost_price_to: 0,



  density:0
}

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    /////Первоначальный объект
    changeOriginalStaf: (state, action: PayloadAction<object | null>) => {
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

    changeCurs_dol: (state, action: PayloadAction<number>) => {
      state.curs_dol = action.payload
    },
    changeCurs_uan: (state, action: PayloadAction<number>) => {
      state.curs_uan = action.payload
    },


    changePrice_uan_from: (state, action: PayloadAction<number>) => {
      state.price_uan_from = action.payload
    },
    changePrice_uan_to: (state, action: PayloadAction<number>) => {
      state.price_uan_to = action.payload
    },

    changeRate_per_kg: (state, action: PayloadAction<number>) => {
      state.rate_per_kg = action.payload
    },
    changeCost_price_from: (state, action: PayloadAction<number>) => {
      state.cost_price_from = action.payload
    },
    changeCost_price_to: (state, action: PayloadAction<number>) => {
      state.cost_price_to = action.payload
    },

    changeDensity: (state, action: PayloadAction<number>) => {
      state.density = action.payload
    },

  },
})

export const { changeOriginalStaf,
  changeAveragePrice,
  changePurchasePrice,
  changeCommission,
  changeWeight,
  changeVolume,
  changeLength,
  changeWidth,
  changeHeight,
  changeCurs_dol,
  changeCurs_uan,
  changePrice_uan_from,
  changePrice_uan_to,
  changeRate_per_kg,
  changeCost_price_from,
  changeCost_price_to,
  changeDensity
} = goodsSlice.actions

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

export const Curs_dol = (state: RootState) => state.goods.curs_dol
export const Curs_uan = (state: RootState) => state.goods.curs_uan

export const Price_uan_from = (state: RootState) => state.goods.price_uan_from
export const Price_uan_to = (state: RootState) => state.goods.price_uan_to

export const Rate_per_kg = (state: RootState) => state.goods.rate_per_kg

export const Cost_price_from = (state: RootState) => state.goods.cost_price_from
export const Cost_price_to = (state: RootState) => state.goods.cost_price_to

export const Density = (state: RootState) => state.goods.density



export default goodsSlice.reducer
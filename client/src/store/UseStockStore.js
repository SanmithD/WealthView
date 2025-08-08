import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';

export const UseStockStore = create((set) =>({
    isLoading: false,
    holdings: null,
    allocation: null,

    fetchHoldings: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/holdings`);
            set({ holdings: response.data.response, isLoading: false });
            toast.success("All holdings")
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            toast.error("Something went wrong")
        }
    },

    fetchAllocation: async() =>{
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/allocation`);
            set({ allocation: response.data, isLoading: false });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
            toast.error("Something went wrong")
        }
    }
}))
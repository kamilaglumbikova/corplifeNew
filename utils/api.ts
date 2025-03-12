import axios from 'axios';

let API_URL = `${process.env.EXPO_PUBLIC_API_URL}/V1`;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Merchant {
  merchant_id: number;
  pending_vouchers: string;
  pending_vouchers_amount: string;
  redeemed_vouchers: string;
  redeemed_vouchers_amount: string;
  redeemed_vouchers_amount_after_margin: string;
  total_amount: number;
  total_deals: number;
  total_vouchers: number;
}

export interface Deal {
  id: number;
  name: string;
  redeemed: number;
  total: number;
}

export interface RedeemDealProps {
  deal_id: number;
  product_name: string;
  image: string;
  valid_dates_range: string;
  limit: string;
  buyer: string;
  state: string;
  purchase_date: string;
  merchant_id: number;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {
      email,
      password,
    },{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      }
    });
    return { data: response };
  } catch (error) {
    return { error: "Failed to login. Please try again." };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.put(`${API_URL}/customers/password`,{
      email: email,
      template: "email_reset",
      websiteId: 2
    },{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return { data: response };
  } catch (error) {
    return { error: "Failed to forgot password. Please try again." };
  }
}

export const getVouchers = async (merchandId: number) => {
  try {
    const response = await axios.post(`${API_URL}/voucher`,{
      merchant_id: merchandId,
      limit: 999
    },{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data };
  } catch(error) {
    return { error: "Failed to fetch vouchers. Please try again." };
  }
}

export const getDetail = async (id:number) => {
  try {
    const response = await axios.get(`${API_URL}/detailcontent/${id}`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return { data: response };
  } catch (error) {
    return { error: "Failed to fetch detail. Please try again." };
  }
}

export const getValidVoucher = async (code:string,merchandId: number) => {
  try {
    const response = await axios.post(`${API_URL}/validate/voucher`,{
      merchant_id: merchandId,
      coupon_code: code.replace(/\D/g, "")
    },{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return { data: response.data };
  } catch(error) {
    return { error: "Failed to fetch vouchers. Please try again." };
  }
}

export const redeemVoucher = async (code:string,merchandId: number) => {
  try {
    const response = await axios.post(`${API_URL}/redeem/voucher`,{
      merchant_id: merchandId,
      coupon_code: code.replace(/\D/g, "")
    },{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return { data: response.data };
  } catch(error) {
    return { error: "Failed to fetch vouchers. Please try again." };
  }
}
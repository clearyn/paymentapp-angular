export interface PaymentDetail {
    paymentDetailId: number;
    cardOwnerName: string;
    cardNumber: number;
    expirationDate: string;
    securityCode: number;
};

export interface PaymentDetailForm {
    cardOwnerName: string;
    cardNumber: number;
    expirationDate: string;
    securityCode: number;
};
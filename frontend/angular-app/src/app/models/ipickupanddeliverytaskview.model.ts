export interface IPickupAndDeliveryTaskView {
  clientEmail: string;
  pickupAndDeliveryTaskId: string;
  contactNumber: string;
  pickupRoom: string;
  deliveryRoom: string;
  pickupContact: string;
  deliveryContact: string;
  confirmationCode: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

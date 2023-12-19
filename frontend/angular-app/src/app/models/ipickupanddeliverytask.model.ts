export interface IPickupAndDeliveryTask {
  pickupAndDeliveryTaskId: string;
  contactNumber: string;
  pickUpRoom: string;
  deliveryRoom: string;
  pickUpContact: string;
  deliveryContact: string;
  confirmationCode: string;
  description: string;
  active: boolean;
}

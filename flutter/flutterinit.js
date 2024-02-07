const Flutterwave = require('flutterwave-node-v3');
const env = require ('dotenv').config()
const schema = require('../flutter/transactions')



const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );

const createPaymentPlan = async () => {
  try {
    const payload = {
      amount: amount,
      name: name, //This is the name of the payment, it will appear on the subscription reminder emails
      interval: interval, //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
    };

    const response = await flw.PaymentPlan.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};






const fetchAllPlans = async () => {
  try {
    const response = await flw.PaymentPlan.get_all();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};





const fetchPlan = async () => {
  try {
    const payload = {
      id: id, //This is the unique ìdof the payment plan you want to fetch. It is returned in the call to create a payment plan asdata.id`
    };

    const response = await flw.PaymentPlan.get_plan(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};







const updatePlan = async () => {
  try {
    const payload = {
      id: id, //This is the unique ìdof the payment plan you want to fetch. It is returned in the call to create a payment plan asdata.id`
      name: name,
      status: status,
    };

    const response = await flw.PaymentPlan.update(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

updatePlan();






const cancelPlan = async () => {
  try {
    const payload = {
      id: id, //This is the unique ìd` of the payment plan you want to cancel
    };

    const response = await flw.PaymentPlan.cancel(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

cancelPlan();

module.exports = {cancelPlan, createPaymentPlan, fetchAllPlans, updatePlan, fetchPlan};
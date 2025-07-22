import * as paymentService from '../services/payment.service';
import { Request, Response } from 'express';
import crypto from "crypto";
import Stripe from "stripe";
import mongoose from "mongoose";

// const stripe = new Stripe("sk_test_51R6ZgFKiBxldEfFSDQhuZZlyZufTUH4ua3pqx4P8XTx746kQN4ufxX4GWZZ8YSehmDhVV6ULYuS9apUtmcdJHhwR00LMZq0lIJ", { apiVersion: "2025-06-30.basil" });

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { amount, currency, paymentId, paymentMethod, status, transactionId, userId, createdAt } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        // Validate required fields
        if (!amount || !currency || !paymentId || !paymentMethod || !status || !transactionId || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a PaymentIntent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to smallest currency unit
            currency,
        });

        // Prepare payment data for saving
        const paymentData = {
            amount,
            currency,
            paymentId,
            paymentMethod,
            status,
            transactionId,
            userId: new mongoose.Types.ObjectId(userId), // Ensure userId is an ObjectId
            createdAt: createdAt ? new Date(createdAt) : new Date(), // Use provided date or default to now
            paymentIntentId: paymentIntent.id,
        };

        // Save payment details to the database
        await paymentService.savePayment(paymentData);

        res.status(200).json({
            message: "Payment saved successfully",
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: "An error occurred while creating payment intent" });
    }
};
export const getAllPayments = async (req:Request, res:Response) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error retrieving payments:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

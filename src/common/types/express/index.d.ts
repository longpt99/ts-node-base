import express from 'express';

declare global {
  namespace Express {
    interface Response {
      success: any;
      error: any;
    }
  }
}

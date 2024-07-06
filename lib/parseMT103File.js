

import fs from 'fs';
import path from 'path';
import { convertToUSD } from './currencyConversion';

export const parseMT103File = async (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const lines = fileContent.split('\n');
  const transactionDetails = {};

  lines.forEach(line => {
    if (line.includes('TRN:')) transactionDetails.trn = line.split('TRN:')[1].trim();
    if (line.includes('COVERAGE TYPE:')) transactionDetails.coverageType = line.split('COVERAGE TYPE:')[1].trim();
    if (line.includes('MESSAGE TYPE:')) transactionDetails.messageType = line.split('MESSAGE TYPE:')[1].trim();
    if (line.includes('AMOUNT:')) transactionDetails.amount = parseFloat(line.split('AMOUNT:')[1].replace(',', '').trim());
    if (line.includes('CURRENCY:')) transactionDetails.currency = line.split('CURRENCY:')[1].trim();
    if (line.includes('STATUS:')) transactionDetails.status = line.split('STATUS:')[1].trim();
    if (line.includes('BIC SENDER:')) transactionDetails.bicSender = line.split('BIC SENDER:')[1].trim();
    if (line.includes('SENDER NAME:')) transactionDetails.senderName = line.split('SENDER NAME:')[1].trim();
    if (line.includes('BIC RECEIVER:')) transactionDetails.bicReceiver = line.split('BIC RECEIVER:')[1].trim();
    if (line.includes('BENEFICIARY NAME:')) transactionDetails.beneficiaryName = line.split('BENEFICIARY NAME:')[1].trim();
  });

  // Convert currency to USD if it's not USD
  if (transactionDetails.currency !== 'USD') {
    transactionDetails.amountUSD = await convertToUSD(transactionDetails.amount, transactionDetails.currency);
  } else {
    transactionDetails.amountUSD = transactionDetails.amount;
  }

  return transactionDetails;
};

import { Injectable } from '@angular/core';
import { Types } from 'mongoose';
import { NautilusAssetServicesService } from 'src/app/services/nautilus-asset-services.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private nautilusAssetServices: NautilusAssetServicesService) {}

  async insertWalletAddress(
    walletAddress: InsertWalletAddress
  ): Promise<Types.ObjectId> {
    return await this.nautilusAssetServices.post<
      InsertWalletAddress,
      Types.ObjectId
    >('search/insert', walletAddress);
  }

  async findWalletAddress(
    wallet_details: FindWalletAddress
  ): Promise<WalletAddress> {
    return await this.nautilusAssetServices.post<
      FindWalletAddress,
      WalletAddress
    >('search/find', wallet_details);
  }
}

type InsertWalletAddress = {
  wallet_id: string;
  owner_name: string;
  phone_number: string | undefined;
};

type FindWalletAddress = {
  owner_name: string;
  phone_number: string;
};

type WalletAddress = {
  wallet_id?: string;
};
